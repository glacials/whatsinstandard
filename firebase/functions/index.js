const { onSchedule } = require("firebase-functions/v2/scheduler");
const { detectRotations } = require("./detect_rotations.js");

exports.detectRotations = onSchedule("every 5 minutes", detectRotations);
