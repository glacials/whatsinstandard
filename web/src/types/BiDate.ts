// BiDate is an object returned by the What's in Standard? API that contains a rough
// date and an optional exact date.
export class BiDate {
  /**
   * Create a new BiDate.
   *
   * @param rough - A rough date, like "Q4 2021".
   * @param exact - An exact date, or null if unknown.
   */
  constructor(rough: string, exact?: string) {
    this.exact = exact;
    this.rough = rough;
  }

  /**
   * The exact date the set exits Standard, or null if unknown.
   */
  exact?: string;
  /**
   * A rough date the set exits Standard, like "Q4 2021".
   */
  rough: string;

  /**
   * Return whether the date has exact precision.
   * @returns Whether the date has exact precision.
   */
  isExact(): boolean {
    return this.exact !== undefined && this.exact !== null;
  }

  /**
   * Return whether the date has passed, according to local time. If the exact date is
   * unknown, it is assumed the date has not passed regardless of the rough date.
   */
  hasPassed(): boolean {
    return this.isExact() && Date.parse(this.exact!) <= Date.now();
  }

  // humanize returns a human-friendly string expressing the BiDate.
  //
  // If the set date has no exact property, a the rough exit date is shown.
  humanize(): string {
    if (this.isExact()) {
      return new Date(this.exact!).toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }

    return this.rough;
  }

  /**
   * Return the date as a human-friendly relative string, like "in 2 days" or
   * "yesterday".
   *
   * @returns A human-friendly relative string in English.
   */
  relative(): string {
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
    function formatTimeAgo(date: Date) {
      let duration = (date.valueOf() - new Date().valueOf()) / 1000;

      for (let i = 0; i < DIVISIONS.length; i++) {
        const division = DIVISIONS[i];
        if (Math.abs(duration) < division.amount) {
          return formatter.format(
            Math.round(duration),
            division.name as Intl.RelativeTimeFormatUnit
          );
        }
        duration /= division.amount;
      }
      return "???";
    }
    return formatTimeAgo(this.toDate());
  }

  // toDate returns a best-guess Date object for the BiDate.
  //
  // If the BiDate has no exact property, the Date is created from the rough property.
  // Because of this you should not display the returned date directly to users, but use
  // it for low-resolution calculations, long-term relative times, and other rough
  // display methods.
  toDate(): Date {
    if (this.isExact()) {
      return new Date(this.exact!);
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
