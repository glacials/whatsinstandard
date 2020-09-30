var apiURL = '/api/v6/standard.json'
var code = Vue.component('set-image', {
  props: ['code'],
  template: `
    <div class="icon ml-2" v-if="code !== undefined && code !== null">
      <i class="ss" :class="\`ss-\${this.code.toLowerCase()}\`"></i>
    </template>
  `,
})

var app = new Vue({
  computed: {
  },

  created: function() {
    fetch(apiURL).then(response => response.json()).then(data => {
      this.sets = data.sets
      this.bans = data.bans
    })

    setInterval(() => this.now = new Date, 1000 * 60)
  },

  data: {
    bans: [],
    now: new Date,
    sets: [],
    showRecentlyDropped: false
  },

  el: '#vue',

  filters: {
    absolute: date => moment(date).format('YYYY-MM-DD'),
    relative: function(date) { return moment(date).from(this.now) },
    year: date => moment(date).format('\\QQ YYYY'),
  },

  methods: {
    // dropped returns the sets in the given array of sets that have dropped from Standard according to local time,
    // preserving order.
    dropped: function(sets) {
      return sets.filter(set => (Date.parse(set.exitDate.exact) || Infinity) <= this.now)
    },

    // dateFrom returns a Date object for the given set date. A set date is an object returned by the What's in
    // Standard? API that contains a rough date and an optional exact date.
    //
    // If the set date has no exact property, a less accurate Date object is still created out of its rough property.
    // Because of this you should not display the returned date directly to users, but use it for low-resolution
    // calculations, long-term relative times, and other rough display methods.
    dateFrom: function(setDate) {
      if (setDate.exact !== null) {
        return Date.parse(setDate.exact)
      }

      if (setDate.rough.match(/Q\d \d{4}/)) {
        const quarter = setDate.rough.split(' ')[0][1]
        const year = setDate.rough.split(' ')[1]

        return new Date(year, 12 - (12 / Number(quarter)) + 1, 15)
      } else {
        return new Date(setDate.rough)
      }
    },

    // humanDate returns a human-friendly string expressing the given set date. A set date is an object returned by the
    // What's in Standard? API that contains a rough date and an optional exact date.
    //
    // If the set date has no exact property, a the rough exit date is shown.
    humanDate: function(setDate) {
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
    isReleased: function(setOrRound) {
      if (Array.isArray(setOrRound)) {
        return this.isReleased(this.last(setOrRound))
      }

      return Date.parse(setOrRound.enterDate.exact) <= this.now
    },

    // last returns the last element of an array.
    last: setsOrRounds => setsOrRounds[setsOrRounds.length - 1],

    // pad returns an array padded to the given length with the given fill value.
    pad: (array, length, fill) => length > array.length ? array.concat(Array(length - array.length).fill(fill)) : array,

    // padded takes an array of rounds (i.e. a two-dimensional array of sets organized by exitDate.rough) and pads the
    // each round with blank sets until it is equal to the size of the largest round.
    padded: function(rounds) {
      const padTo = Math.max(...rounds.map(round => round.length))
      const fillerSet = {unknown: true}
      return rounds.map(round => this.pad(round, padTo, fillerSet))
    },

    // recent returns an array containing only the last element of the given array.
    recent: setsOrRounds => [setsOrRounds[setsOrRounds.length - 1]],

    // rounds splits the given array of sets into a two-dimensional array where each sub-array is a group of sets that
    // share a exitDate.rough. The outer array is ordered by exitDate.rough ascending. The inner array order is
    // preserved from the input.
    rounds: function(sets) {
      return Object.values(sets.reduce((rounds, set) => {
        return Object.assign(rounds, {[set.exitDate.rough]: (rounds[set.exitDate.rough] || []).concat(set)})
      }, {})).sort((a, b) => (a[0].exitDate.rough < b[0].exitDate.rough) ? -1 : 1)
    },

    // standard returns the sets in the given array that are currently in Standard according to local time, preserving
    // order.
    standard: function(sets) {
      return _.difference(sets, this.unreleased(sets), this.dropped(sets))
    },

    // toggleRecentlyDropped shows or hides the recently dropped sets area of the page.
    toggleRecentlyDropped: function() {
      this.showRecentlyDropped = !this.showRecentlyDropped
      const msg = this.showRecentlyDropped ? 'show recently dropped sets' : 'hide recently dropped sets'
      ga('send', 'event', 'link', 'click', msg)
    },

    // truncate returns the sets or rounds in the given array, but limits unreleased sets or rounds to 1. Use this to
    // prevent the UI from feeling overloaded if we happen to get a bunch of new information about the next year of
    // sets.
    truncate: function(setsOrRounds) {
      var unreleasedSetsOrRounds = 0
      return setsOrRounds.filter(setOrROund => {
        if (!this.isReleased(setOrROund)) {
          unreleasedSetsOrRounds += 1
        }

        return unreleasedSetsOrRounds <= 1
      })
    },

    // undropped returns the sets in the given array of sets that have not dropped from Standard (including sets that
    // haven't even entered it yet) according to local time, preserving order.
    undropped: function(sets) {
      return sets.filter(set => (Date.parse(set.exitDate.exact) || Infinity) > this.now)
    },

    // unreleased returns the sets in the given array that have not been released yet according to local time,
    // preserving order.
    unreleased: function(sets) {
      return sets.filter(set => (Date.parse(set.enterDate.exact) || Infinity) > this.now)
    },
  }
})
