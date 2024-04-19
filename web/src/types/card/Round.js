import CardSet from "./CardSet";

/**
 * A group of {@link CardSet CardSets} that share an exit date.
 */
export default class Round {
  /**
   * Return the {@link Round Rounds} in the given array that have dropped from Standard,
   * according to local time. Order is preserved.
   *
   * @param {Round[]} rounds - The array of rounds to filter.
   * @returns {Round[]} - The filtered array of rounds containing only the dropped rounds.
   */
  static dropped(rounds) {
    return rounds.filter((round) => round.isDropped());
  }

  /**
   * Group the given {@link CardSet CardSets} into {@link Round Rounds}.
   * Order is preserved.
   *
   * @param {CardSet[]} sets - The array of sets to be converted.
   * @returns {Round[]} An array of rounds.
   */
  static ify(sets) {
    // Note that to preserve order for the outer array, the key of the interim object
    // must be a string because ES2015 object property order is preserved only for
    // string keys.
    return Object.values(
      sets.reduce((rounds, set) => {
        return Object.assign(rounds, {
          [set.exitDate.rough]: (rounds[set.exitDate.rough] || []).concat(set),
        });
      }, {})
    ).map((sets) => new Round(sets));
  }

  /**
   * Filter an array of {@link Round Rounds} to only include rounds with sets that are
   * either in Standard or are next in line to enter Standard.
   *
   * @param {Round[]} rounds - An array of {@link Round Rounds}.
   * @returns {Round[]} An array of the given {@link Round Rounds}, minus all unreleased rounds
   * except the soonest.
   */
  static relevant(rounds) {
    return rounds
      .filter((round) => !round.isDropped())
      .filter((round) => round.isFullyReleased())
      .concat(rounds.filter((round) => !round.isFullyReleased())[0]);
  }

  /**
   * Return the {@link Round Rounds} in the given array that have not dropped from
   * Standard (including sets that haven't entered it yet), according to local time.
   * Order is preserved.
   *
   * @param {Round[]} rounds - The array of rounds to filter.
   * @returns {Round[]} - The array of rounds without the dropped rounds.
   */
  static undropped(rounds) {
    return rounds.filter((round) => !round.isDropped());
  }

  /**
   * Return the exit date of the round. Guaranteed to be equivalent for all sets in the
   * round.
   *
   * @type {BiDate}
   */
  exitDate;

  /**
   * The set's unique ID for this page load. This is used for various constructs that
   * need to keep track of a different DOM element per set, like Bootstrap accordions.
   *
   * @type {string}
   */
  internalId;

  /**
   * The {@link CardSet CardSets} contained in this round. All share the same exit date.
   *
   * @type {CardSet[]}
   */
  sets;

  /**
   * Create a new {@link Round} from the given {@link CardSet CardSets}.
   *
   * @param {CardSet[]} sets - The sets to be included in the round.
   */
  constructor(sets) {
    this.sets = sets;
    this.exitDate = this.sets[0].exitDate;

    this.internalId =
      this.sets[0].code ||
      this.sets[0].name?.split(" ").join("-") ||
      this.sets[0].codename?.split(" ").join("-") ||
      Math.random().toString(36).substring(2, 15);
  }

  /**
   * Return true if the {@link Round} has dropped from Standard. Uses local time.
   *
   * A round with an unknown exact drop date is considered not dropped. A round that has
   * not yet entered Standard is considered not dropped.
   *
   * @returns {boolean} - True if the round has dropped from Standard; false otherwise.
   */
  isDropped() {
    if (this.exitDate.exact === undefined) {
      return false;
    }
    return Date.parse(this.exitDate.exact) <= Date.now();
  }

  /**
   * Return true if the {@link Round} has been released, or false otherwise. Uses local
   * time.
   *
   * A round is fully released if and only if all its {@link CardSet CardSets} are
   * released.
   *
   * @returns {boolean} - True if the round has been completely released; false otherwise.
   */
  isFullyReleased() {
    return this.sets.every((set) => set.isReleased());
  }
}
