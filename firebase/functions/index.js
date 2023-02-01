const functions = require("firebase-functions");
const fetch = require("node-fetch");
const assert = require("assert");

const mastodon = require("masto");
const twitter = require("twitter-api-client");

const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

const MAX_TOOT_LENGTH = 500;
const MAX_TWEET_LENGTH = 280;

collection = db.collection("twitterbot/last-known/sets");

exports.maybeTweet = functions.pubsub
  .schedule("every 5 minutes")
  .onRun(async (context) => {
    setsByName = {};

    wisSets = await standardSets();
    wisSets.forEach((set) => (setsByName[set.name] = set));
    wisSetNames = new Set(wisSets.map((set) => set.name));

    cacheSets = await collection.get();
    cacheSetNames = new Set();
    cacheSets.forEach((doc) => {
      const set = doc.data();

      assert(set);
      assert(set.name);

      setsByName[set.name] = set;
      cacheSetNames.add(set.name);
    });

    unchangedSetNames = intersection(cacheSetNames, wisSetNames);
    addedSetNames = difference(wisSetNames, cacheSetNames);
    removedSetNames = difference(cacheSetNames, wisSetNames);

    unchangedSets = new Set(
      Array.from(unchangedSetNames).map((name) => setsByName[name])
    );
    addedSets = new Set(
      Array.from(addedSetNames).map((name) => setsByName[name])
    );
    removedSets = new Set(
      Array.from(removedSetNames).map((name) => setsByName[name])
    );

    addedSets.forEach((set) => collection.add(set));
    removedSets.forEach((set) =>
      collection
        .where("name", "==", set.name)
        .get()
        .then((snapshot) => snapshot.forEach((doc) => doc.ref.delete()))
    );

    functions.logger.info(
      `Unchanged sets: ${Array.from(unchangedSetNames).join(", ")}`
    );
    functions.logger.info(
      `Removed sets: ${Array.from(removedSetNames).join(", ")}`
    );
    functions.logger.info(
      `Added sets: ${Array.from(addedSetNames).join(", ")}`
    );

    if (addedSets.size == 0 && removedSets.size == 0) {
      functions.logger.info(
        `No sets changed, not tweeting (${cacheSetNames.size} sets in Firestore, ${wisSetNames.size} sets in WIS API)`
      );
      return;
    }

    const config = functions.config();
    const twitterClient = new twitter.TwitterClient({
      apiKey: config.twitter.api_key,
      apiSecret: config.twitter.api_secret,
      accessToken: config.twitter.access_token,
      accessTokenSecret: config.twitter.access_token_secret,
    });
    const mastodonClient = await mastodon.login({
      url: config.mastodon.server_url,
      accessToken: config.mastodon.access_token,
    });

    let longPost = `Standard has changed!\n\n`;
    longPost += `${Array.from(addedSets)
      .map((set) => `+ ${set.name} was added`)
      .join("\n")}\n`;
    longPost += `${Array.from(removedSets)
      .map((set) => `- ${set.name} was removed`)
      .join("\n")}`;

    let shortPost = `Standard has changed!\n\n`;
    shortPost += `${Array.from(addedSets)
      .map((set) => `+ ${set.name}`)
      .join("\n")}\n`;
    shortPost += `${Array.from(removedSets)
      .map((set) => `- ${set.name}`)
      .join("\n")}`;

    let tweet = longPost;

    // Twittter
    if (tweet.length > MAX_TWEET_LENGTH) {
      functions.logger.warn(
        `Tweet would be too long, trying shorter version: ${tweet}`
      );
      tweet = shortPost;

      if (tweet.length > MAX_TWEET_LENGTH) {
        functions.logger.error(
          `Even short tweet would be too long, unsure what to do: ${tweet}`
        );
        return;
      }
    }

    functions.logger.info(`Tweeting: ${tweet}`);
    twitterResponse = await twitterClient.tweets.statusesUpdate({
      status: tweet,
    });

    let toot = longPost;

    // Mastodon
    if (toot.length > MAX_TOOT_LENGTH) {
      functions.logger.warn(
        `Toot would be too long, trying shorter version: ${toot}`
      );
      toot = shortPost;

      if (toot.length > MAX_TOOT_LENGTH) {
        functions.logger.error(
          `Even short toot would be too long, unsure what to do: ${toot}`
        );
        return;
      }
    }

    functions.logger.info(`Tooting: ${toot}`);
    mastodonResponse = await mastodonClient.v1.statuses.create({
      status: toot,
      visibility: public,
    });
  });

const standardSets = () => {
  return fetch("https://whatsinstandard.com/api/v6/standard.json")
    .then((response) => response.json())
    .then((body) => {
      return body.sets.filter((set) => {
        return (
          (Date.parse(set.enterDate.exact) || Infinity) <= Date.now() &&
          (Date.parse(set.exitDate.exact) || Infinity) > Date.now()
        );
      });
    });
};

const difference = (setA, setB) =>
  new Set([...setA].filter((x) => !setB.has(x)));
const intersection = (setA, setB) =>
  new Set([...setA].filter((x) => setB.has(x)));
