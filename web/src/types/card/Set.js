import { BiDate } from "../BiDate.js";

class Symbol {
  /**
   * The URL to a common-quality symbol for the set.
   *
   * @returns {string} The URL to the image.
   */
  common;

  /**
   * The URL to an uncommon-quality symbol for the set.
   *
   * @returns {string} The URL to the image.
   */
  uncommon;

  /**
   * The URL to a rare-quality symbol for the set.
   *
   * @returns {string} The URL to the image.
   */
  rare;

  /**
   * The URL to a mythic-quality symbol for the set.
   *
   * @returns {string} The URL to the image.
   */
  mythicRare;
}

/**
 * A Magic: The Gathering set.
 */
export class Set {
  /**
   * Create a new Set.
   *
   * @param json - A JSON object from the What's in Standard? API v6 representing a Set.
   */
  constructor(json) {
    this.name = json.name;
    this.codename = json.codename;
    this.code = json.code;
    this.symbol = json.symbol;
    this.enterDate = new BiDate(json.enterDate.rough, json.enterDate.exact);
    this.exitDate = new BiDate(json.exitDate.rough, json.exitDate.exact);

    this.internalId =
      this.code ||
      this.name?.split(" ").join("-") ||
      this.codename?.split(" ").join("-") ||
      Math.random().toString(36).substring(2, 15);
  }
  /**
   * The set's English name.
   *
   * @type {string | null}
   */
  name;
  /**
   * The "internal" name Wizards of the Coast uses to refer to the set while it is under
   * development. This often is part of a thematic group for sets in a block, e.g. a
   * two-set block might have codenames "Milk" and "Cookies".
   *
   * @type {string | null}
   */
  codename;
  /**
   * The three-character unique code Wizards of the Coast uses to refer to the set, e.g.
   * "KTK" for Khans of Tarkir or "M15" for the 2015 Core Set.
   *
   * @type {string | null}
   */
  code;
  /**
   * The set's unique ID for this page load. This is used for various constructs that
   * need to keep track of a different DOM element per set, like Bootstrap accordions.
   *
   * @type {string | null}
   */
  internalId;
  /**
   * The date the set enters Standard, which is virtually always its release date.
   *
   * @type {BiDate}
   */
  enterDate;
  /**
   * The date the set exits Standard.
   *
   * @type {BiDate}
   */
  exitDate;
  /**
   * URLs to variations of the set's logo.
   *
   * @type {Symbol}
   */
  symbol;

  /**
   * Return the {@link Set Sets} in the given array that have dropped from Standard,
   * according to local time. Order is preserved.
   *
   * @param sets - The array of {@link Set Sets} to be filtered.
   * @returns {Set[]} All {@link Set Sets} from the given array that have dropped from Standard.
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
   * @param {Set[]} sets - The array of {@link Set Sets} to filter.
   * @returns {Set[]} All {@link Set Sets} from the given array that are currently in Standard.
   */
  static standard(sets) {
    return sets.filter(
      (set) =>
        !this.unreleased(sets).includes(set) &&
        !this.dropped(sets).includes(set)
    );
  }

  /**
   * Return the {@link Set Sets} in the given array of sets that have not dropped from
   * Standard (including sets that haven't even entered it yet), according to local
   * time. Order is preserved.
   *
   * @param {Set[]} sets - The array of {@link Set Sets} to be filtered.
   * @returns {Set[]} All {@link Set Sets} from the given array that have not dropped from
   * Standard.
   */
  static undropped(sets) {
    return sets.filter((set) => !set.isDropped());
  }

  /**
   * Return the {@link Set Sets} in the given array of sets that have not yet entered
   * Standard, according to local time. Order is preserved.
   *
   * @param {Set[]} sets - The array of {@link Set Sets} to be filtered.
   * @returns {Set[]} All {@link Set Sets} from the given array that have not yet entered
   * Standard.
   */
  static unreleased(sets) {
    return sets.filter((set) => !set.isReleased());
  }

  /**
   * Return whether the set has been dropped from Standard according to local time. An
   * unreleased set is not considered dropped.
   *
   * @returns {boolean} True if the set has been dropped from Standard; false otherwise.
   */
  isDropped() {
    return this.exitDate.hasPassed();
  }
  /**
   * Return whether set has been released according to local time.
   *
   * @returns {boolean} True if the set has been released; false otherwise.
   */
  isReleased() {
    return this.enterDate.hasPassed();
  }
}
