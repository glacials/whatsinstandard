"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Set = void 0;
const BiDate_1 = require("../BiDate");
/**
 * A Magic: The Gathering set.
 */
class Set {
    /**
     * Create a new Set.
     * @param json - A JSON object from API v6 representing a Set.
     */
    constructor(json) {
        var _a, _b;
        this.name = json.name;
        this.codename = json.codename;
        this.code = json.code;
        this.symbol = json.symbol;
        this.enterDate = new BiDate_1.BiDate(json.enterDate.rough, json.enterDate.exact);
        this.exitDate = new BiDate_1.BiDate(json.exitDate.rough, json.exitDate.exact);
        this.internalId =
            this.code ||
                ((_a = this.name) === null || _a === void 0 ? void 0 : _a.split(" ").join("-")) ||
                ((_b = this.codename) === null || _b === void 0 ? void 0 : _b.split(" ").join("-")) ||
                Math.random().toString(36).substring(2, 15);
    }
    /**
     * Return the {@link Set Sets} in the given array that have dropped from Standard,
     * according to local time. Order is preserved.
     *
     * @param sets - The array of {@link Set Sets} to be filtered.
     * @returns All {@link Set Sets} from the given array that have dropped from Standard.
     */
    static dropped(sets) {
        return sets.filter((set) => {
            if (set.exitDate.exact === undefined) {
                return false;
            }
            return Date.parse(set.exitDate.exact) <= Date.now();
        });
    }
    /**
     * Return the {@link Set Sets} in the given array that are currently in Standard,
     * using local time. Order is preserved.
     *
     * @param sets - The array of {@link Set Sets} to filter.
     * @returns All {@link Set Sets} from the given array that are currently in Standard.
     */
    static standard(sets) {
        return sets.filter((set) => !this.unreleased(sets).includes(set) &&
            !this.dropped(sets).includes(set));
    }
    /**
     * Return the {@link Set Sets} in the given array of sets that have not dropped from
     * Standard (including sets that haven't even entered it yet), according to local
     * time. Order is preserved.
     *
     * @param sets - The array of {@link Set Sets} to be filtered.
     * @returns All {@link Set Sets} from the given array that have not dropped from
     * Standard.
     */
    static undropped(sets) {
        return sets.filter((set) => !set.isDropped());
    }
    /**
     * Return the {@link Set Sets} in the given array of sets that have not yet entered
     * Standard, according to local time. Order is preserved.
     *
     * @param sets - The array of {@link Set Sets} to be filtered.
     * @returns All {@link Set Sets} from the given array that have not yet entered
     * Standard.
     */
    static unreleased(sets) {
        return sets.filter((set) => !set.isReleased());
    }
    /**
     * Return whether the set has been dropped from Standard according to local time. An
     * unreleased set is not considered dropped.
     *
     * @returns True if the set has been dropped from Standard; false otherwise.
     */
    isDropped() {
        return this.exitDate.hasPassed();
    }
    /**
     * Return whether set has been released according to local time.
     *
     * @returns True if the set has been released; false otherwise.
     */
    isReleased() {
        return this.enterDate.hasPassed();
    }
}
exports.Set = Set;
//# sourceMappingURL=Set.js.map