<script lang="ts">
import moment from "moment"
import SetImage from './SetImage.vue'

const apiURL = '/api/v6/standard.json'

class Set {
  name: string
  codename: string
  code: string
  symbol: {
    common: string
    uncommon: string
    rare: string
    mythicRare: string
  }
  enterDate: SetDate
  exitDate: SetDate
}

class Ban {
  cardName: string
  cardImageUrl: string
  setCode: string
  reason: string
  announcementUrl: string
}

class SetDate {
  exact: string
  rough: string
}

export default {
  components: {
    SetImage,
  },

  computed: {
  },

  created: function () {
    fetch(apiURL).then(response => response.json()).then(data => {
      this.sets = data.sets
      this.bans = data.bans
    })

    setInterval(() => this.now = new Date, 1000 * 60)
  },

  data() {
    return {
      bans: [],
      now: new Date,
      sets: [],
      showRecentlyDropped: false,
      hideAlert20230507: true,
    }
  },

  el: '#vue',

  methods: {
    // bansFor returns the bans in the given bans array that apply to the given array of
    // sets.
    bansFor: function (sets: Set[], bans: Ban[]) {
      return bans.filter((ban: Ban) => sets.map((set: Set) => set.code).includes(ban.setCode))
    },

    // dropped returns the sets in the given array of sets that have dropped from Standard according to local time,
    // preserving order.
    dropped: function (sets: Set[]) {
      return sets.filter((set: Set) => (Date.parse(set.exitDate.exact) || Infinity) <= this.now)
    },

    // dateFrom returns a Date object for the given set date. A set date is an object returned by the What's in
    // Standard? API that contains a rough date and an optional exact date.
    //
    // If the set date has no exact property, a less accurate Date object is still created out of its rough property.
    // Because of this you should not display the returned date directly to users, but use it for low-resolution
    // calculations, long-term relative times, and other rough display methods.
    dateFrom: function (setDate: { exact: string | null; rough: string }) {
      if (setDate.exact !== null) {
        return Date.parse(setDate.exact)
      }

      if (setDate.rough.match(/Q\d \d{4}/)) {
        const quarter = setDate.rough.split(' ')[0][1]
        const year = parseInt(setDate.rough.split(' ')[1])

        return new Date(year, 12 - (12 / Number(quarter)) + 1, 15)
      } else {
        return new Date(setDate.rough)
      }
    },

    // humanDate returns a human-friendly string expressing the given set date. A set date is an object returned by the
    // What's in Standard? API that contains a rough date and an optional exact date.
    //
    // If the set date has no exact property, a the rough exit date is shown.
    humanDate: function (setDate: { exact: string | number | Date | null; rough: string }) {
      if (setDate.exact !== null) {
        return new Date(setDate.exact).toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      }

      return setDate.rough
    },

    // isReleased returns true if the given set or round has been released according to local time, or false otherwise.
    // A round is released if and only if all its sets are released.
    isReleased: function (setOrRound: Set | Set[]) {
      if (Array.isArray(setOrRound)) {
        return this.isReleased(this.last(setOrRound))
      }

      return Date.parse(setOrRound.enterDate.exact) <= this.now
    },

    // last returns the last element of an array.
    last: (a: any[]) => a[a.length - 1],

    // pad returns an array padded to the given length with the given fill value.
    pad: function (array: any[], length: number, fill: any) {
      return length > array.length ? array.concat(Array(length - array.length).fill(fill)) : array
    },

    // padded takes an array of rounds (i.e. a two-dimensional array of sets grouped by
    // exitDate.rough) and pads each round with blank sets until it is equal to the size
    // of the largest round.
    padded: function (rounds: Set[][]) {
      const padTo = Math.max(...rounds.map((round: Set[]) => round.length))
      const fillerSet = { unknown: true }
      return rounds.map((round: Set[]) => this.pad(round, padTo, fillerSet))
    },

    // recent returns an array containing only the last element of the given array.
    recent: (a: any[]) => [a[a.length - 1]],

    // relative returns a human-friendly relative time string for the given date.
    relative: function (date: moment.MomentInput) { return moment(date).from(this.now) },

    // rounds splits the given array of sets into a two-dimensional array where each sub-array is a group of sets that
    // share a exitDate.rough. Orders are preserved.
    rounds: function (sets: Set[]) {
      // Note that to preserve order for the outer array, the key of the interim object
      // must be a string because ES2015 object property order is preserved only for
      // string keys.
      return Object.values(sets.reduce((rounds: { [x: string]: any }, set: Set) => {
        return Object.assign(rounds, { [set.exitDate.rough]: (rounds[set.exitDate.rough] || []).concat(set) })
      }, {}))
    },

    // standard returns the sets in the given array that are currently in Standard according to local time, preserving
    // order.
    standard: function (sets: Set[]) {
      return sets.filter((set: Set) => !this.unreleased(sets).includes(set) && !this.dropped(sets).includes(set))
    },

    // toggleRecentlyDropped shows or hides the recently dropped sets area of the page.
    toggleRecentlyDropped: function () {
      this.showRecentlyDropped = !this.showRecentlyDropped
    },

    // truncate returns the sets or rounds in the given array, but limits unreleased
    // sets or rounds to 1. Use this to prevent the UI from feeling overloaded if we
    // happen to get a bunch of new information about the next year of sets.
    truncate: function (setsOrRounds: any[]) {
      let unreleasedSetsOrRounds = 0

      return setsOrRounds.filter((setOrROund: Set | Set[]) => {
        if (!this.isReleased(setOrROund)) {
          unreleasedSetsOrRounds += 1
        }

        return unreleasedSetsOrRounds <= 1
      })
    },

    // undropped returns the sets in the given array of sets that have not dropped from Standard (including sets that
    // haven't even entered it yet) according to local time, preserving order.
    undropped: function (sets: Set[]) {
      return sets.filter((set: Set) => (Date.parse(set.exitDate.exact) || Infinity) > this.now)
    },

    // unreleased returns the sets in the given array that have not been released yet according to local time,
    // preserving order.
    unreleased: function (sets: Set[]) {
      return sets.filter((set: Set) => (Date.parse(set.enterDate.exact) || Infinity) > this.now)
    },
  },

  mounted() {
    this.hideAlert20230507 = (localStorage.hideAlert20230507 === '1') || (this.now > Date.parse('2024-01-01T00:00:00Z'))
  },

  watch: {
    hideAlert20230507(v) {
      // Local storage only stores strings.
      localStorage.hideAlert20230507 = v ? '1' : '0'
    }
  }
}
</script>
