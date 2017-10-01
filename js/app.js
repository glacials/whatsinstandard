var apiURL = 'http://whatsinstandard.com/api/v5/sets.json'
var code = Vue.component('set-image', {
  props: ['code'],
  template: `
    <span v-tippy="{ position: 'left' }" class="icon tip" :title="code">
      <i class="ss" :class="imsym"></i>
    </span>
  `,
  data: function () {
    return {
      imsym: 'ss-' + this.code.toLowerCase()
    }
  },
})

var app = new Vue({
  el: '#vue-container',

  data: {
    sets: [],
  },

  created: function () {
    this.fetchData()
  },

  filters: {
    moment: function (date) {
      return moment(date).format('MMMM Do, YYYY');
    }
  },

  methods: {
    fetchData: function () {
      let self = this;

      let setsByBlock = {};
      let recentlyDroppedSetsByBlock = {};

      let xhr = new XMLHttpRequest()
      xhr.open('GET', apiURL);
      xhr.onload = function () {
        self.sets = JSON.parse(xhr.responseText).sets;
      };
      xhr.send();
    },

    dropped: function(sets) {
      return sets.filter(function(set) {
        return Date.parse(set.exit_date) < Date.now();
      });
    },

    standard: function(sets) {
      return sets.filter(function(set) {
        return ((Date.parse(set.enter_date) || Infinity) <= Date.now())
            && ((Date.parse(set.exit_date ) || Infinity) >= Date.now());
      });
    },

    unreleased: function(sets) {
      return sets.filter(function(set) {
        return Date.parse(set.enter_date) > Date.now();
      });
    },

    blocks: function(sets) {
      let blocks = {};
      sets.forEach(function(set) {
        if(!blocks[set.block]) {
          blocks[set.block] = [];
        }
        blocks[set.block].push(set);
      });
      return blocks;
    },

    isReleased: function (set) {
      return Date.parse(set.enter_date) <= Date.now();
    },

    firstUnreleasedSet: function(block) {
      return block.find(function(set) {
        return Date.parse(set.enter_date) > Date.now();
      });
    }
  }
});
