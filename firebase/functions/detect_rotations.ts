import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const db = admin.firestore();

const twitterCollection = db.collection("twitterbot/last-known/sets");
const mastodonCollection = db.collection("mastodonbot/last-known/sets");

import { diff, standardSets, toot, tweet } from "./lib";

admin.initializeApp();

export async function detectRotations(context: any) {
  const config = functions.config();
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
    await tweet(config, setDifferences);
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
    await toot(config, setDifferences);
  });
}
