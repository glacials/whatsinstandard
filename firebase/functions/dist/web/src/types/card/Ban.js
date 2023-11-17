"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ban = void 0;
/**
 * A {@link Ban} is a card that is or was banned in Standard.
 */
class Ban {
    /**
     * Create a new {@link Ban} from the given JSON.
     */
    constructor(json) {
        this.cardName = json.cardName;
        this.cardImageUrl = json.cardImageUrl;
        this.setCode = json.setCode;
        this.reason = json.reason;
        this.announcementUrl = json.announcementUrl;
    }
}
exports.Ban = Ban;
//# sourceMappingURL=Ban.js.map