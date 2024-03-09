import { onSchedule } from "firebase-functions/v2/scheduler";
import { detectRotations } from "./detect_rotations.js";

export default onSchedule("every 5 minutes", detectRotations);
