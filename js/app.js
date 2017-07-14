var apiURL = 'http://whatsinstandard.com/api/4/sets.json'
var symbol = Vue.component('edition-symbol', {
  props: ['symbol'],
  template: '<span class="icon"><i class="ss" :class="imsym"></i></span>',
  data: function () {
    return {
      imsym: 'ss-' + this.symbol.toLowerCase()
    }
  },
})

var app = new Vue({
  el: '#vue-container',

  data: {
    editions: null,
    blockeditions: null
  },

  created: function () {
    this.fetchData()
  },

  filters: {
    moment: function (date) {
      return moment(date).format('MMMM Do YYYY');
    }
  },

  methods: {
    fetchData: function () {
      var xhr = new XMLHttpRequest()
      var self = this;
      var blockeditions = {};
      xhr.open('GET', apiURL);
      xhr.onload = function () {
        self.editions = JSON.parse(xhr.responseText)

        for(var i=0; i<self.editions.length; i++) {
          if(!blockeditions[self.editions[i].block]) {
            blockeditions[self.editions[i].block] = [];
          }

          blockeditions[self.editions[i].block].push(self.editions[i]);
        }
        self.blockeditions = blockeditions;
      };
      xhr.send();
    },

    isNotReleased: function (release_date) {
      return Date.parse(release_date) > Date.now();
    },

    getFirstNotReleasedSet: function (block) {
      for(var i=0; i < block.length; i++) {
        if(this.isNotReleased(block[i].enter_date)) {
          return block[i].name + " releases " + moment(block[i].enter_date).format('MMMM Do, YYYY');
        }
      }
    }
  }
});
