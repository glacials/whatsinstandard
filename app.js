var apiURL = 'http://whatsinstandard.com/api/4/sets.json'

/**
 * Actual demo
 */

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
      return v.replace(/T|Z/g, ' ')
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
	debugger
	for(var i=0; i<self.editions.length; i++){
		if(!blockeditions[self.editions[i].block]){
			blockeditions[self.editions[i].block] = []
		}
		blockeditions[self.editions[i].block].push(self.editions[i])	
	}
	self.blockeditions = blockeditions
	debugger
      }
      xhr.send()
    }
  }
})
