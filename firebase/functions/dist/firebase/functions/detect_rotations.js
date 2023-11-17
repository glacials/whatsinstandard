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
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectRotations = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const db = admin.firestore();
const twitterCollection = db.collection("twitterbot/last-known/sets");
const mastodonCollection = db.collection("mastodonbot/last-known/sets");
const lib_1 = require("./lib");
admin.initializeApp();
async function detectRotations(context) {
    const config = functions.config();
    const apiSets = await (0, lib_1.standardSets)();
    await (0, lib_1.diff)(twitterCollection, apiSets).then(async (setDifferences) => {
        if (setDifferences.addedSets.size == 0 &&
            setDifferences.removedSets.size == 0) {
            functions.logger.info(`No sets changed, not tweeting (${setDifferences.unchangedSets.size} sets accounted for)`);
            return;
        }
        await (0, lib_1.tweet)(config, setDifferences);
    });
    await (0, lib_1.diff)(mastodonCollection, apiSets).then(async (setDifferences) => {
        if (setDifferences.addedSets.size == 0 &&
            setDifferences.removedSets.size == 0) {
            functions.logger.info(`No sets changed, not tooting (${setDifferences.unchangedSets.size} sets accounted for)`);
            return;
        }
        await (0, lib_1.toot)(config, setDifferences);
    });
}
exports.detectRotations = detectRotations;
//# sourceMappingURL=detect_rotations.js.map