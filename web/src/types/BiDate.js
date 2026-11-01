/**
 * A BiDate is a date returned by the What's in Standard? API that contains a rough date and an optional exact date.
 */
export class BiDate {
  /**
   * Create a new BiDate.
   *
   * @param {string} rough - A rough date, like "Q4 2021".
   * @param {string | null} exact - An exact date, or null if unknown.
   */
  constructor(rough, exact) {
    this.exact = exact;
    this.rough = rough;
  }

  /**
   * The exact date the set exits Standard, or null if unknown.
   *
   * @type {string | null}
   */
  exact;
  /**
   * A rough date the set exits Standard, like "Q4 2021".
   *
   * @type {string}
   */
  rough;

  /**
   * Return whether the date has exact precision.
   *
   * @returns {boolean} - Whether the date has exact precision.
   */
  isExact() {
    return this.exact !== undefined && this.exact !== null;
  }

  /**
   * Return whether the date has passed, according to local time. If the exact date is
   * unknown, it is assumed the date has not passed regardless of the rough date.
   *
   * @type {boolean}
   */
  hasPassed() {
    return this.isExact() && Date.parse(this.exact) <= Date.now();
  }

  /**
   * Return a human-friendly string expressing the BiDate.
   *
   * If the set date has no exact property, the rough exit date is used.
   *
   * @returns {string} - A human-friendly string expressing the BiDate.
   */
  humanize() {
    if (this.isExact()) {
      return new Date(this.exact).toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }

    if (this.rough.match(/Q[12] \d{4}/)) {
      return this.rough.replace(/Q\d/, "early");
    } else if (this.rough.match(/Q[34] \d{4}/)) {
      return this.rough.replace(/Q\d/, "late");
    }

    return this.rough;
  }

  /**
   * Return the date as a human-friendly relative string, like "in 2 days" or
   * "yesterday".
   *
   * @returns {string} - A human-friendly relative string in English.
   */
  relative() {
    const DIVISIONS = [
      { amount: 60, name: "seconds" },
      { amount: 60, name: "minutes" },
      { amount: 24, name: "hours" },
      { amount: 7, name: "days" },
      { amount: 4.34524, name: "weeks" },
      { amount: 12, name: "months" },
      { amount: Number.POSITIVE_INFINITY, name: "years" },
    ];
    const formatter = new Intl.RelativeTimeFormat("en", { style: "short" });

    /**
     * Formats the given date as a relative time ago.
     *
     * @param {Date} date - The date to format.
     * @returns {string} - The formatted relative time ago string.
     */
    function formatTimeAgo(date) {
      let duration = (date.valueOf() - new Date().valueOf()) / 1000;

      for (let i = 0; i < DIVISIONS.length; i++) {
        const division = DIVISIONS[i];
        if (Math.abs(duration) < division.amount) {
          return formatter.format(Math.round(duration), division.name);
        }
        duration /= division.amount;
      }
      return "???";
    }
    return formatTimeAgo(this.toDate());
  }

  /**
   * Return a best-guess Date object for the BiDate.
   *
   * If the BiDate has no exact property, the Date is created from the rough property.
   * Because of this you should not display the returned date directly to users, but use
   * it for low-resolution calculations, long-term relative times, and other rough
   * display methods.
   *
   * @returns {Date} - A best-guess Date object for the BiDate.
   */
  toDate() {
    if (this.isExact()) {
      return new Date(this.exact);
    }

    if (this.rough.match(/Q\d \d{4}/)) {
      const quarter = this.rough.split(" ")[0][1];
      const year = parseInt(this.rough.split(" ")[1]);
      const month = (Number(quarter) - 1) * 3;

      return new Date(year, month, 15);
    } else {
      return new Date(this.rough);
    }
  }
}
