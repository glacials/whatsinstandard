/**
 * A set symbol icon.
 */
export default class Symbol {
  /**
   * Create a new Symbol.
   *
   * @param {Object} json A JSON object from the What's in Standard? API v6 representing a Symbol.
   */
  constructor(json) {
    this.common = json.common;
    this.uncommon = json.uncommon;
    this.rare = json.rare;
    this.mythicRare = json.mythicRare;
  }
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
