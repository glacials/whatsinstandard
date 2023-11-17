"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.craftPost = exports.standardSets = exports.diff = exports.toot = exports.tweet = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const functions = __importStar(require("firebase-functions"));
const logger_1 = require("firebase-functions/logger");
const mastodon = __importStar(require("masto"));
const twitter_api_sdk_1 = require("twitter-api-sdk");
const card = __importStar(require("../../web/src/types/card"));
const MAX_TOOT_LENGTH = 500;
const MAX_TWEET_LENGTH = 280;
async function tweet(config, setDifferences) {
    const twitterClient = new twitter_api_sdk_1.Client(config.twitter.bearer_token);
    const tweet = craftPost(setDifferences, MAX_TWEET_LENGTH);
    if (tweet === null) {
        return;
    }
    functions.logger.info(`Tweeting: ${tweet}`);
    const response = twitterClient.tweets.createTweet({ text: tweet });
    functions.logger.info(`Twitter response: ${response}`);
}
exports.tweet = tweet;
async function toot(config, setDifferences) {
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
exports.toot = toot;
/**
 * Uses the given collection to see if we need to post about the current set state. This
 * can differ if, for example, one platform failed to post in an earlier invocation but
 * one succeeded.
 *
 * WARNING: When you spin up a new platform its collection will be empty, so this will
 * return ALL sets in addedSets. For e.g. Mastodon, a giant post will be made on the
 * next invocation even if there was not a rotation recently.
 *
 * @param collection The collection to check against.
 * @param apiSets The sets to check against the collection.
 * @returns A diff object containing the added, removed, and unchanged sets.
 */
async function diff(collection, apiSets) {
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
    const addedSets = new Set(Array.from(addedSetNames).map((name) => setsByName.get(name)));
    const removedSets = new Set(Array.from(removedSetNames).map((name) => setsByName.get(name)));
    const unchangedSets = new Set(Array.from(unchangedSetNames).map((name) => setsByName.get(name)));
    addedSets.forEach((set) => collection.add(new card.Set(set)));
    // TODO: When API has internal IDs, look up by those instead of name.
    removedSets.forEach((set) => new card.Set(collection
        .where("name", "==", set.name)
        .get()
        .then((snapshot) => snapshot.forEach((doc) => doc.ref.delete()))));
    // This is here just to stop you from thinking I forgot about unchangedSets. We don't
    // want to update Firestore for any unchanged sets, because they're unchanged!
    unchangedSets.forEach(() => { });
    functions.logger.info(`Removed sets: ${Array.from(removedSetNames).join(", ")}`);
    functions.logger.info(`Added sets: ${Array.from(addedSetNames).join(", ")}`);
    functions.logger.info(`Unchanged sets: ${Array.from(unchangedSetNames).join(", ")}`);
    return {
        addedSets: addedSets,
        removedSets: removedSets,
        unchangedSets: unchangedSets,
    };
}
exports.diff = diff;
async function standardSets() {
    const response = await (0, node_fetch_1.default)("https://whatsinstandard.com/api/v6/standard.json");
    const body = await response.json();
    if (body.deprecated) {
        (0, logger_1.error)("What's in Standard? API v6 is deprecated!");
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
        return (Date.parse(set.enterDate.exact) <= Date.now() &&
            Date.parse(set.exitDate.exact) > Date.now());
    });
}
exports.standardSets = standardSets;
function craftPost(data, characterLimit) {
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
    functions.logger.warn(`Post would be too long, trying shorter version. Long post was: ${longPost}`);
    if (shortPost.length < characterLimit) {
        return shortPost;
    }
    functions.logger.error(`Even short post would be too long, unsure what to do. Short post was: ${shortPost}`);
    return null;
}
exports.craftPost = craftPost;
const difference = (setA, setB) => new Set([...setA].filter((x) => !setB.has(x)));
const intersection = (setA, setB) => new Set([...setA].filter((x) => setB.has(x)));
//# sourceMappingURL=lib.js.map