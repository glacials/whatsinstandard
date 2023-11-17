import fetch from "node-fetch";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { error } from "firebase-functions/logger";

import * as mastodon from "masto";
import { Client as TwitterClient } from "twitter-api-sdk";

import * as card from "../../web/src/types/card";

const MAX_TOOT_LENGTH = 500;
const MAX_TWEET_LENGTH = 280;

export async function tweet(
  config: Record<string, any>,
  setDifferences: {
    addedSets: Set<card.Set>;
    removedSets: Set<card.Set>;
  }
) {
  const twitterClient = new TwitterClient(config.twitter.bearer_token);
  const tweet = craftPost(setDifferences, MAX_TWEET_LENGTH);
  if (tweet === null) {
    return;
  }

  functions.logger.info(`Tweeting: ${tweet}`);
  const response = twitterClient.tweets.createTweet({ text: tweet });
  functions.logger.info(`Twitter response: ${response}`);
}

export async function toot(
  config: Record<string, any>,
  setDifferences: { addedSets: Set<card.Set>; removedSets: Set<card.Set> }
) {
  const mastodonClient = await mastodon.login({
    url: config.mastodon.server_url,
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
 * Uses the given collection to see if we need to post about the current set state.
 * This can differ if, for example, one platform failed to post in an earlier invocation but one succeeded.
 *
 * WARNING: When you spin up a new platform its collection will be empty,
 * so this will return ALL sets in addedSets.
 * This will result in a giant unwanted post on invocation even if there was not a rotation recently.
 *
 * @param collection The collection to check against.
 * @param apiSets The sets to check against the collection.
 * @returns A diff object containing the added, removed, and unchanged sets.
 */
export async function diff(
  collection: admin.firestore.CollectionReference<admin.firestore.DocumentData>,
  apiSets: card.Set[]
) {
  const setsByName: Map<string, card.Set> = new Map<string, card.Set>();
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
    Array.from(addedSetNames).map((name) => setsByName.get(name)!)
  );
  const removedSets = new Set(
    Array.from(removedSetNames).map((name) => setsByName.get(name)!)
  );
  const unchangedSets = new Set(
    Array.from(unchangedSetNames).map((name) => setsByName.get(name)!)
  );

  addedSets.forEach((set) => collection.add(new card.Set(set)));
  // TODO: When API has internal IDs, look up by those instead of name.
  removedSets.forEach(
    (set) =>
      new card.Set(
        collection
          .where("name", "==", set.name)
          .get()
          .then((snapshot) =>
            snapshot.forEach((doc: { ref: { delete: () => any } }) =>
              doc.ref.delete()
            )
          )
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

export async function standardSets() {
  const response = await fetch(
    "https://whatsinstandard.com/api/v6/standard.json"
  );
  const body: { deprecated: boolean; sets: any[]; bans: any[] } =
    await response.json();
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

export function craftPost(
  data: { addedSets: Set<card.Set>; removedSets: Set<card.Set> },
  characterLimit: number
) {
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

const difference = (setA: Set<any>, setB: Set<any>) =>
  new Set([...setA].filter((x) => !setB.has(x)));
const intersection = (setA: Set<any>, setB: Set<any>) =>
  new Set([...setA].filter((x) => setB.has(x)));
