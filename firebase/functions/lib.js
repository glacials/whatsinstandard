import fetch from "node-fetch";
import admin from "firebase-admin";
import functions from "firebase-functions";
import { error } from "firebase-functions/logger";

import { login as mastodonLogin } from "masto";
import { TwitterApi } from "twitter-api-v2";

import CardSet from "./whatsinstandard/card/CardSet.js";

const MAX_TOOT_LENGTH = 500;
const MAX_TWEET_LENGTH = 280;

/**
 * Tweets a post on Twitter containing added or removed sets.
 * If there are none,
 * no tweet is sent.
 *
 * @param {Object} setDifferences - The set differences object.
 * @param {Set<CardSet>} setDifferences.addedSets - The added sets.
 * @param {Set<CardSet>} setDifferences.removedSets - The removed sets.
 * @returns {Promise<void>} - A promise that resolves when the tweet is sent.
 */
export async function tweet(setDifferences) {
  const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_KEY_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  }).readWrite;
  const tweet = craftPost(setDifferences, MAX_TWEET_LENGTH);
  if (tweet === null) {
    return;
  }

  functions.logger.info(`Tweeting: ${tweet}`);
  try {
    const response = await twitterClient.v2.tweet({ text: tweet });
    functions.logger.info(`Twitter response:`);
    functions.logger.info(response);
  } catch (error) {
    functions.logger.error(error);
  }
}

/**
 * Toots a post on Mastodon containing added or removed sets.
 * If there are none,
 * no toot is sent.
 *
 * @param {Object} setDifferences - The set differences object.
 * @param {Set<CardSet>} setDifferences.addedSets - The added sets.
 * @param {Set<CardSet>} setDifferences.removedSets - The removed sets.
 * @returns {Promise<void>} - A promise that resolves when the toot is sent.
 */
export async function toot(setDifferences) {
  console.log(`MASTODON_ACCESS_TOKEN=${process.env.MASTODON_ACCESS_TOKEN}`);
  const mastodonClient = await mastodonLogin({
    url: process.env.MASTODON_SERVER_URL,
    accessToken: process.env.MASTODON_ACCESS_TOKEN,
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
  functions.logger.info(`Mastodon response:`);
  functions.logger.info(response);
}

/**
 * Calculates the difference between the sets in the Firestore collection and the provided API sets.
 * @param {admin.firestore.CollectionReference<admin.firestore.DocumentData>} collection - The Firestore collection reference.
 * @param {CardSet[]} apiSets - The API sets to compare with the Firestore collection.
 * @returns {Promise<{ addedSets: Set<CardSet>, removedSets: Set<CardSet>, unchangedSets: Set<CardSet> }>} - An object containing the added sets, removed sets, and unchanged sets.
 */
export async function diff(collection, apiSets) {
  /**
   * Map containing sets by name.
   * @type {Map<string, CardSet>}
   */
  const setsByName = new Map();
  apiSets.forEach((set) => set.name && setsByName.set(set.name, set));

  const apiSetNames = new Set(apiSets.map((set) => set.name));
  /**
   * The set of set names seen from either the API or Firestore.
   * @type {Set<string>}
   */
  const knownSetNames = new Set();
  let initOnly = false;
  const docs = (await collection.get()).docs;
  if (docs.length <= 1) {
    initOnly = true;
    for (let doc; doc !== undefined; doc = docs.pop()) {
      doc.ref.delete();
    }
  } else {
    for (const doc of docs) {
      try {
        const document = doc.data();
        if (!document || !document.name) {
          throw `Document ${doc.id} in collection ${collection.path} is missing a name`;
        }

        setsByName.set(document.name, new CardSet(document));
        knownSetNames.add(document.name);
      } catch (error) {
        functions.logger.error(error);
      }
    }
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

  addedSets.forEach((set) => collection.add(JSON.parse(set.toJSON())));
  // TODO: When API has internal IDs, look up by those instead of name.
  removedSets.forEach(
    (set) =>
      new Set(
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

  if (initOnly) {
    addedSets.clear();
    functions.logger.info(
      `Too many added sets; assuming a new environment. Skipping posts.`
    );
  }

  return {
    addedSets: addedSets,
    removedSets: removedSets,
    unchangedSets: unchangedSets,
  };
}

/**
 * Fetches the standard sets from the API.
 *
 * @returns {Promise<CardSet[]>} - All sets currently in Standard.
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
    .map((json) => new CardSet(json))
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
 * @param {Set<CardSet>} data.addedSets - The added sets.
 * @param {Set<CardSet>} data.removedSets - The removed sets.
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

/**
 * Calculate the difference between two sets.
 * The input sets are not modified.
 *
 * @template T
 * @param {Set<T>} setA - The set to subtract from.
 * @param {Set<T>} setB - The set to subtract.
 * @returns {Set<T>} - The set of elements in setA but not in setB.
 */
const difference = (setA, setB) =>
  new Set([...setA].filter((x) => !setB.has(x)));
/**
 * Return the intersection of two sets.
 * The input sets are not modified.
 *
 * @template T
 * @param {Set<T>} setA - The first set.
 * @param {Set<T>} setB - The second set.
 * @returns {Set<T>} - A new Set containing the intersection of setA and setB.
 */
const intersection = (setA, setB) =>
  new Set([...setA].filter((x) => setB.has(x)));
