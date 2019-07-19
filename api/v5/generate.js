#!/usr/bin/env node
'use strict';

const fs = require('fs')

const inputFile = './api/internal.json'
const outputFile = './api/v5/sets.json'
const deprecated = true

module.exports = {
  // generate generates API v5 from the raw set data in api/internal.json.
  generate: function () {
    fs.readFile(inputFile, (err, inputBody) => {
      if (err) throw err

      const inputJSON = JSON.parse(inputBody)
      const outputJSON = {
        "deprecated": deprecated,
        "sets": [],
        "bans": []
      }
      inputJSON.sets.filter(set => set.name !== null).forEach((set) => {
        outputJSON.sets.push({
          "name": set.name,
          "block": set.block,
          "code": set.code,
          "enter_date": set.enter_date,
          "exit_date": set.exit_date,
          "rough_exit_date": set.rough_exit_date
        })
      })
      inputJSON.bans.forEach((ban) => {
        outputJSON.bans.push({
          "card_name": ban.card_name,
          "card_image_url": ban.card_image_url,
          "set_code": ban.set_code,
          "reason": ban.reason,
          "announcement_url": ban.announcement_url
        })
      })

      const outputBody = JSON.stringify(outputJSON, null, 2) + "\n"

      fs.writeFile(outputFile, outputBody, (err) => {
        if (err) throw err
      })
    })
  }
}
