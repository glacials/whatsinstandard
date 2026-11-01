/**
 * A {@link Ban} is a card that is or was banned in Standard.
 */
export default class Ban {
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
  /**
   * The English name of the banned card.
   * @type {string}
   */
  cardName;
  /**
   * A URL to an image of the banned card.
   */
  cardImageUrl;
  /**
   * The set code of the banned card. This is guaranteed to match the code from a
   * {@link Set}.}
   * @type {string}
   */
  setCode;
  /**
   * The reason the card was banned, in a single English complete sentence.
   * @type {string}
   */
  reason;
  /**
   * A URL to a post by Wizards of the Coast explaining the ban.
   * @type {string}
   */
  announcementUrl;
}
