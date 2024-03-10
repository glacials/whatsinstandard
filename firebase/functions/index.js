import { onSchedule } from "firebase-functions/v2/scheduler";
import { detectRotations as run } from "./detect_rotations.js";

const detectRotations = onSchedule(`every 1 minutes`, run);
export { detectRotations };
