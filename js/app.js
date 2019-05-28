var apiURL = '/api/v5/sets.json'
var code = Vue.component('set-image', {
  props: ['code'],
  template: `
    <span v-tippy="{ placement: 'left' }" class="icon tip" :title="code">
      <i class="ss" :class="imsym"></i>
    </span>
  `,
  data: function() {
    return {
      imsym: 'ss-' + this.code.toLowerCase()
    }
  },
})

var app = new Vue({
  el: '#vue',

  data: {
    sets: [],
    bans: [],
    showRecentlyDropped: false
  },

  created: function() {
    let self = this

    fetch(apiURL).then(function(response) {
      response.json().then(function(data) {
        self.sets = data.sets
        self.bans = data.bans
      })
    })
  },

  filters: {
    relative: function(date) {
      return moment(date).fromNow()
    },

    absolute: function(date) {
      return moment(date).format('YYYY-MM-DD')
    }
  },

  methods: {
    dropped: function(sets) {
      return sets.filter(function(set) {
        return (Date.parse(set.exit_date) || Infinity) <= Date.now()
      })
    },

    unreleased: function(sets) {
      return sets.filter(function(set) {
        return (Date.parse(set.enter_date) || Infinity) > Date.now()
      })
    },

    standard: function(sets) {
      return _.difference(sets, this.unreleased(sets), this.dropped(sets))
    },

    // rounds takes an array of sets and returns a two-dimensional array of sets, with each sub-array being a group of
    // the input sets that drop on the same rough_exit_date. The order of the outer array is by date-increasing. The
    // order of the inner arrays is preserved from the input.
    rounds: function(sets) {
      return Object.values(sets.reduce(function(rounds, set) {
        return _.extend(rounds, {[set.rough_exit_date]: (rounds[set.rough_exit_date] || []).concat(set)})
      }, {})).sort(function(a, b) {
        return (a[0].rough_exit_date < b[0].rough_exit_date) ? -1 : 1
      })
    },

    // recent returns an array containing only the last element of the given array.
    recent: function(sets_or_rounds) {
      return [sets_or_rounds[sets_or_rounds.length - 1]]
    },

    isReleased: function(set) {
      return Date.parse(set.enter_date) <= Date.now()
    },

    toggleRecentlyDropped: function() {
      this.showRecentlyDropped = !(this.showRecentlyDropped)
      var msg = (this.showRecentlyDropped) ? 'show recently dropped sets' : 'hide recently dropped sets'
      ga('send', 'event', 'link', 'click', msg)
    },
  }
})
