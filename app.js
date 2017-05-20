var apiURL = 'http://whatsinstandard.com/api/4/sets.json'

/**
 * Actual demo
 */

var demo = new Vue({

  el: '#vue-container',

  data: {
    editions: null
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
      xhr.open('GET', apiURL)
      xhr.onload = function () {
        self.editions = JSON.parse(xhr.responseText)
        //console.log(self.commits[0].html_url)
      }
      xhr.send()
    }
  }
})
