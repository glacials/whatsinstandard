import { BiDate } from "../BiDate";
import * as card from ".";

/**
 * A Magic: The Gathering set.
 */
export class Set {
  /**
   * Create a new Set.
   * @param json - A JSON object from API v6 representing a Set.
   */
  constructor(json: any) {
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
   */
  name?: string;
  /**
   * The "internal" name Wizards of the Coast uses to refer to the set while it is under
   * development. This often is part of a thematic group for sets in a block, e.g. a
   * two-set block might have codenames "Milk" and "Cookies".
   */
  codename?: string;
  /**
   * The three-character unique code Wizards of the Coast uses to refer to the set, e.g.
   * "KTK" for Khans of Tarkir or "M15" for the 2015 Core Set.
   */
  code?: string;
  /**
   * The set's unique ID for this page load. This is used for various constructs that
   * need to keep track of a different DOM element per set, like Bootstrap accordions.
   */
  internalId: string;
  /**
   * The date the set enters Standard, which is virtually always its release date.
   */
  enterDate: BiDate;
  /**
   * The date the set exits Standard.
   */
  exitDate: BiDate;
  /**
   * URLs to variations of the set's logo.
   */
  symbol: {
    common: string;
    uncommon: string;
    rare: string;
    mythicRare: string;
  };

  /**
   * Return the {@link Set Sets} in the given array that have dropped from Standard,
   * according to local time. Order is preserved.
   *
   * @param sets - The array of {@link Set Sets} to be filtered.
   * @returns All {@link Set Sets} from the given array that have dropped from Standard.
   */
  static dropped(sets: card.Set[]) {
    return sets.filter((set: card.Set) => {
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
  static standard(sets: card.Set[]): card.Set[] {
    return sets.filter(
      (set: card.Set) =>
        !this.unreleased(sets).includes(set) &&
        !this.dropped(sets).includes(set)
    );
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
  static undropped(sets: Set[]): Set[] {
    return sets.filter((set: Set) => !set.isDropped());
  }

  /**
   * Return the {@link Set Sets} in the given array of sets that have not yet entered
   * Standard, according to local time. Order is preserved.
   *
   * @param sets - The array of {@link Set Sets} to be filtered.
   * @returns All {@link Set Sets} from the given array that have not yet entered
   * Standard.
   */
  static unreleased(sets: Set[]): Set[] {
    return sets.filter((set: card.Set) => !set.isReleased());
  }

  /**
   * Return whether the set has been dropped from Standard according to local time. An
   * unreleased set is not considered dropped.
   *
   * @returns True if the set has been dropped from Standard; false otherwise.
   */
  isDropped(): boolean {
    return this.exitDate.hasPassed();
  }
  /**
   * Return whether set has been released according to local time.
   *
   * @returns True if the set has been released; false otherwise.
   */
  isReleased(): boolean {
    return this.enterDate.hasPassed();
  }
}
