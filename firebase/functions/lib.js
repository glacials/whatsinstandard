import fetch from "node-fetch";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { error } from "firebase-functions/logger";

import * as mastodon from "masto";
import { Client as TwitterClient } from "twitter-api-sdk";

import { Set } from "./whatsinstandard/card/Set.js";

const MAX_TOOT_LENGTH = 500;
const MAX_TWEET_LENGTH = 280;

/**
 * Tweets any new or removed sets.
 * If there are none,
 * no tweet is sent.
 *
 * @param {Record<string, any>} config - The configuration object.
 * @param {Object} setDifferences - The set differences object.
 * @param {Set<card.Set>} setDifferences.addedSets - The added sets.
 * @param {Set<card.Set>} setDifferences.removedSets - The removed sets.
 * @returns {Promise<void>} - A promise that resolves when the tweet is sent.
 */
export async function tweet(config, setDifferences) {
  const twitterClient = new TwitterClient(config.twitter.bearer_token);
  const tweet = craftPost(setDifferences, MAX_TWEET_LENGTH);
  if (tweet === null) {
    return;
  }

  functions.logger.info(`Tweeting: ${tweet}`);
  const response = twitterClient.tweets.createTweet({ text: tweet });
  functions.logger.info(`Twitter response: ${response}`);
}

/**
 * Toots a message on Mastodon.
 *
 * @param {Record<string, any>} config - The configuration object.
 * @param {{ addedSets: Set<card.Set>; removedSets: Set<card.Set> }} setDifferences - The set differences object.
 * @returns {Promise<void>} - A promise that resolves when the toot is sent.
 */
export async function toot(config, setDifferences) {
  const mastodonClient = await mastodon.login({
    url: config.mastodon.server.url,
    accessToken: config.mastodon.access_token,
  });

  const toot = craftPost(setDifferences, MAX_TOOT_LENGTH);
  if (toot === null) {
    return;
  }

  functions.logger.info(`Tooting: ${toot}`);
  const response = await mastodonClient.v1.statuses.create({
    status: toot,
    visibility: "public",
  });
  functions.logger.info(`Mastodon response: ${response}`);
}

/**
 * Calculates the difference between the sets in the Firestore collection and the provided API sets.
 * @param {admin.firestore.CollectionReference<admin.firestore.DocumentData>} collection - The Firestore collection reference.
 * @param {card.Set[]} apiSets - The API sets to compare with the Firestore collection.
 * @returns {Promise<{ addedSets: Set<card.Set>, removedSets: Set<card.Set>, unchangedSets: Set<card.Set> }>} - An object containing the added sets, removed sets, and unchanged sets.
 */
export async function diff(collection, apiSets) {
  /**
   * Map containing sets by name.
   * @type {Map<string, card.Set>}
   */
  const setsByName = new Map();
  apiSets.forEach((set) => set.name && setsByName.set(set.name, set));

  const apiSetNames = new Set(apiSets.map((set) => set.name));

  const knownSetNames = new Set();
  for (const doc of (await collection.get()).docs) {
    const document = doc.data();

    if (!document || !document.name) {
      throw `Document ${doc.id} in collection ${collection.path} is missing a name`;
    }

    setsByName.set(document.name, new card.Set(document));
    knownSetNames.add(document.name);
  }

  const addedSetNames = difference(apiSetNames, knownSetNames);
  const removedSetNames = difference(knownSetNames, apiSetNames);
  const unchangedSetNames = intersection(apiSetNames, knownSetNames);

  const addedSets = new Set(
    Array.from(addedSetNames).map((name) => setsByName.get(name))
  );
  const removedSets = new Set(
    Array.from(removedSetNames).map((name) => setsByName.get(name))
  );
  const unchangedSets = new Set(
    Array.from(unchangedSetNames).map((name) => setsByName.get(name))
  );

  addedSets.forEach((set) =>
    collection.add(Object.assign({}, new card.Set(set)))
  );
  // TODO: When API has internal IDs, look up by those instead of name.
  removedSets.forEach(
    (set) =>
      new card.Set(
        collection
          .where("name", "==", set.name)
          .get()
          .then((snapshot) => snapshot.forEach((doc) => doc.ref.delete()))
      )
  );
  // This is here just to stop you from thinking I forgot about unchangedSets. We don't
  // want to update Firestore for any unchanged sets, because they're unchanged!
  unchangedSets.forEach(() => {});

  functions.logger.info(
    `Removed sets: ${Array.from(removedSetNames).join(", ")}`
  );
  functions.logger.info(`Added sets: ${Array.from(addedSetNames).join(", ")}`);
  functions.logger.info(
    `Unchanged sets: ${Array.from(unchangedSetNames).join(", ")}`
  );

  return {
    addedSets: addedSets,
    removedSets: removedSets,
    unchangedSets: unchangedSets,
  };
}

/**
 * Fetches the standard sets from the API.
 * @returns {Promise<card.Set[]>} - A promise that resolves to an array of standard sets.
 */
export async function standardSets() {
  const response = await fetch(
    "https://whatsinstandard.com/api/v6/standard.json"
  );
  const body = await response.json();
  if (body.deprecated) {
    error("What's in Standard? API v6 is deprecated!");
  }
  return body.sets
    .map((json) => new card.Set(json))
    .filter((set) => {
      if (!set.enterDate.exact) {
        return false;
      }
      if (!set.exitDate.exact) {
        return Date.parse(set.enterDate.exact) <= Date.now();
      }
      return (
        Date.parse(set.enterDate.exact) <= Date.now() &&
        Date.parse(set.exitDate.exact) > Date.now()
      );
    });
}

/**
 * Crafts a post based on the added and removed sets.
 * @param {Object} data - The set differences object.
 * @param {Set<card.Set>} data.addedSets - The added sets.
 * @param {Set<card.Set>} data.removedSets - The removed sets.
 * @param {number} characterLimit - The character limit for the post.
 * @returns {string|null} - The crafted post or null if it exceeds the character limit.
 */
export function craftPost(data, characterLimit) {
  let longPost = `Standard has changed!\n\n`;
  longPost += `${Array.from(data.addedSets)
    .map((set) => `+ ${set.name} was added`)
    .join("\n")}\n`;
  longPost += `${Array.from(data.removedSets)
    .map((set) => `- ${set.name} was removed`)
    .join("\n")}`;

  let shortPost = `Standard has changed!\n\n`;
  shortPost += `${Array.from(data.addedSets)
    .map((set) => `+ ${set.name}`)
    .join("\n")}\n`;
  shortPost += `${Array.from(data.removedSets)
    .map((set) => `- ${set.name}`)
    .join("\n")}`;

  if (longPost.length < characterLimit) {
    return longPost;
  }
  functions.logger.warn(
    `Post would be too long, trying shorter version. Long post was: ${longPost}`
  );

  if (shortPost.length < characterLimit) {
    return shortPost;
  }
  functions.logger.error(
    `Even short post would be too long, unsure what to do. Short post was: ${shortPost}`
  );

  return null;
}

const difference = (setA, setB) =>
  new Set([...setA].filter((x) => !setB.has(x)));
const intersection = (setA, setB) =>
  new Set([...setA].filter((x) => setB.has(x)));
