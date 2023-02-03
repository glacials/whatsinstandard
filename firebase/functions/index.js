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

twitterCollection = db.collection("twitterbot/last-known/sets");
mastodonCollection = db.collection("mastodonbot/last-known/sets");

exports.maybeTweet = functions.pubsub
  .schedule("every 5 minutes")
  .onRun(async (context) => {
    const config = functions.config();

    wisSets = await standardSets();

    await shouldPost(twitterCollection, wisSets).then(async (data) => {
      if (data.addedSets.size == 0 && data.removedSets.size == 0) {
        functions.logger.info(
          `No sets changed, not tweeting (${cacheSetNames.size} sets in Firestore, ${wisSetNames.size} sets in WIS API)`
        );
        return;
      }

      const twitterClient = new twitter.TwitterClient({
        apiKey: config.twitter.api_key,
        apiSecret: config.twitter.api_secret,
        accessToken: config.twitter.access_token,
        accessTokenSecret: config.twitter.access_token_secret,
      });

      const tweet = craftPost(data, MAX_TWEET_LENGTH);
      if (tweet === null) {
        return;
      }

      functions.logger.info(`Tweeting: ${tweet}`);
      response = await twitterClient.tweets.statusesUpdate({
        status: tweet,
      });
      functions.logger.info(`Twitter response: ${response}`);
    });

    await shouldPost(mastodonCollection, wisSets).then(async (data) => {
      if (data.addedSets.size == 0 && data.removedSets.size == 0) {
        functions.logger.info(
          `No sets changed, not tooting (${cacheSetNames.size} sets in Firestore, ${wisSetNames.size} sets in WIS API)`
        );
        return;
      }

      const mastodonClient = await mastodon.login({
        url: config.mastodon.server_url,
        accessToken: config.mastodon.access_token,
      });

      const toot = craftPost(data, MAX_TOOT_LENGTH);
      if (toot === null) {
        return;
      }

      functions.logger.info(`Tooting: ${toot}`);
      response = await mastodonClient.v1.statuses.create({
        status: toot,
        visibility: "public",
      });
      functions.logger.info(`Mastodon response: ${response}`);
    });
  });

// Uses the given collection to see if we need to post about the current set
// state. This can differ if, for example, one platform failed to post in an
// earlier invocation but one succeeded.
//
// WARNING: When you spin up a new platform its collection will be empty, so a
// post will be made on the next invocation even if there was not a rotation
// recently.
const shouldPost = async (collection, wisSets) => {
  setsByName = {};
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
  functions.logger.info(`Added sets: ${Array.from(addedSetNames).join(", ")}`);

  return { addedSets: addedSets, removedSets: removedSets };
};

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

// Data should look like {addedSets: [...], removedSets: [...]}
const craftPost = (data, characterLimit) => {
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
};

const difference = (setA, setB) =>
  new Set([...setA].filter((x) => !setB.has(x)));
const intersection = (setA, setB) =>
  new Set([...setA].filter((x) => setB.has(x)));
