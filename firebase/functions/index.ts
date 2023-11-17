import * as functions from "firebase-functions";

import { detectRotations } from "./detect_rotations";

functions.pubsub.schedule("every 5 minutes").onRun(detectRotations);
