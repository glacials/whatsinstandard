import * as functions from "firebase-functions";

import { detectRotations } from "./detect_rotations.js";

// Work around Firebase Functions.
const exports = {};

exports.detectRotations = functions.pubsub
  .schedule("every 5 minutes")
  .onRun(detectRotations);
