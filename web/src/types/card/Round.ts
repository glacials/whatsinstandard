import * as card from ".";
import { BiDate } from "../BiDate";

/**
 * A group of {@link card.Set Sets} that share an exit date.
 */
export class Round {
  /**
   * Return the {@link Round Rounds} in the given array that have dropped from Standard,
   * according to local time. Order is preserved.
   *
   * @param rounds - An array of {@link Round Rounds}.
   * @returns All {@link Round Rounds} from the given array that have dropped from
   * Standard.
   */
  static dropped(rounds: Round[]): Round[] {
    return rounds.filter((round: Round) => round.isDropped());
  }

  /**
   * Group the given {@link card.Set Sets} into {@link Round Rounds}. Order is
   * preserved.
   *
   * @param sets - An array of sets.
   * @returns An array of rounds composed of the given sets.
   */
  static ify(sets: card.Set[]): Round[] {
    // Note that to preserve order for the outer array, the key of the interim object
    // must be a string because ES2015 object property order is preserved only for
    // string keys.
    return Object.values(
      sets.reduce((rounds: { [x: string]: any }, set: card.Set) => {
        return Object.assign(rounds, {
          [set.exitDate.rough]: (rounds[set.exitDate.rough] || []).concat(set),
        });
      }, {})
    ).map((sets: card.Set[]) => new Round(sets));
  }

  /**
   * Filter an array of {@link Round Rounds} to only include rounds with sets that are
   * either in Standard or are next in line to enter Standard.
   *
   * @param rounds - An array of {@link Round Rounds}.
   * @returns An array of the given {@link Round Rounds}, minus all unreleased rounds
   * except the soonest.
   */
  static relevant(rounds: Round[]) {
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
   * @param rounds - An array of {@link Round Rounds}.
   * @returns All {@link Round Rounds} from the given array that have not dropped from
   * Standard.
   */
  static undropped(rounds: Round[]): Round[] {
    return rounds.filter((round: Round) => !round.isDropped());
  }

  /**
   * Return the exit date of the round. Guaranteed to be equivalent for all sets in the
   * round.
   *
   * @returns The exit date of the round.
   */
  exitDate: BiDate;

  /**
   * The set's unique ID for this page load. This is used for various constructs that
   * need to keep track of a different DOM element per set, like Bootstrap accordions.
   */
  internalId: string;

  /**
   * The {@link card.Set Sets} contained in this round. All share the same exit date.
   */
  sets: card.Set[];

  /**
   * Create a new {@link Round} from the given {@link card.Set Sets}.
   */
  constructor(sets: card.Set[]) {
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
   * A round is fully released if and only if all its {@link card.Set Sets} are
   * released.
   *
   * @returns True if the round has been completely released; false otherwise.
   */
  isFullyReleased() {
    return this.sets.every((set: card.Set) => set.isReleased());
  }
}
