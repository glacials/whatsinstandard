import * as functions from "firebase-functions";
import admin from "firebase-admin";
import { initializeApp } from "firebase-admin/app";

if (!admin.apps.length) {
  initializeApp();
}

const db = admin.firestore();
const twitterCollection = db.collection("twitterbot/last-known/sets");
const mastodonCollection = db.collection("mastodonbot/last-known/sets");

import { diff, standardSets, toot, tweet } from "./lib.js";

/**
 * Detects set rotations and,
 * if there are any,
 * tweets and toots about them.
 *
 * @param {functions.EventContext} context - The event context.
 */
export async function detectRotations(context) {
  const apiSets = await standardSets();

  await diff(twitterCollection, apiSets).then(async (setDifferences) => {
    if (
      setDifferences.addedSets.size == 0 &&
      setDifferences.removedSets.size == 0
    ) {
      functions.logger.info(
        `No sets changed, not tweeting (${setDifferences.unchangedSets.size} sets accounted for)`
      );
      return;
    }
    await tweet(setDifferences);
  });

  await diff(mastodonCollection, apiSets).then(async (setDifferences) => {
    if (
      setDifferences.addedSets.size == 0 &&
      setDifferences.removedSets.size == 0
    ) {
      functions.logger.info(
        `No sets changed, not tooting (${setDifferences.unchangedSets.size} sets accounted for)`
      );
      return;
    }
    await toot(setDifferences);
  });
}
