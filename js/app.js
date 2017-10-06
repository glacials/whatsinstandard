var apiURL = 'http://whatsinstandard.com/api/v5/sets.json'
var code = Vue.component('set-image', {
  props: ['code'],
  template: `
    <span v-tippy="{ position: 'left' }" class="icon tip" :title="code">
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
    sets: []
  },

  created: function() {
    let self = this;

    fetch(apiURL).then(function(response) {
      response.json().then(function(data) {
        self.sets = data.sets;
      });
    });
  },

  filters: {
    moment: function(date) {
      return moment(date).format('MMMM Do, YYYY');
    }
  },

  methods: {
    dropped: function(sets) {
      return sets.filter(function(set) {
        return (Date.parse(set.exit_date) || Infinity) <= Date.now();
      });
    },

    unreleased: function(sets) {
      return sets.filter(function(set) {
        return (Date.parse(set.enter_date) || Infinity) > Date.now();
      });
    },

    standard: function(sets) {
      return _.difference(sets, this.unreleased(sets), this.dropped(sets));
    },

    blocks: function(sets) {
      return sets.reduce(function(blocks, set) {
        return _.extend(blocks, {[set.block]: (blocks[set.block] || []).concat(set)});
      }, {});
    },

    isReleased: function(set) {
      return Date.parse(set.enter_date) <= Date.now();
    },

    firstUnreleasedSet: function(block) {
      return block.find(function(set) {
        return Date.parse(set.enter_date) > Date.now();
      });
    }
  }
});
