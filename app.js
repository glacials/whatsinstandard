var apiURL = 'http://whatsinstandard.com/api/4/sets.json'
/**
 * Actual demo
 */
//Vue.use(require('vue-moment'));
var symbol = Vue.component('edition-symbol', {
	props: [ 'symbol'],
	template: '<span class="icon"><i :title="symbol" class="ss tip-left" :class="imsym"></i></span>',
    	data: function(){
		return {
			imsym: 'ss-' + this.symbol.toLowerCase()
		}
	},

})

var demo = new Vue({

  el: '#vue-container',

  data: {
    editions: null,
    blockeditions: null
  },

  created: function () {
    this.fetchData()
  },

  filters: {
    truncate: function (v) {
      var newline = v.indexOf('\n')
      return newline > 0 ? v.slice(0, newline) : v
    },
    formatDate: function (v) {
      console.log(v)
      //var date = new Date(v)
      return v.replace(/T|Z/g, ' ')

    },
    moment: function (date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    }
  },

  methods: {
    fetchData: function () {
      var xhr = new XMLHttpRequest()
      var self = this
      var blockeditions = {};
      xhr.open('GET', apiURL)
      xhr.onload = function () {
        self.editions = JSON.parse(xhr.responseText)
	for(var i=0; i<self.editions.length; i++){
		if(!blockeditions[self.editions[i].block]){
			blockeditions[self.editions[i].block] = []
		}
		blockeditions[self.editions[i].block].push(self.editions[i])	
	}
	self.blockeditions = blockeditions
      }
      xhr.send()
    }
  }
})
