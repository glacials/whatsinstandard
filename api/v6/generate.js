#!/usr/bin/env node
'use strict';

const fs = require('fs')

const inputFile = './api/internal.json'
const outputFile = './api/v6/standard.json'
const deprecated = false

module.exports = {
  // generate generates this API version from the raw set data in api/internal.json.
  generate: function () {
    fs.readFile(inputFile, (err, inputBody) => {
      if (err) throw err

      const inputJSON = JSON.parse(inputBody)
      const outputJSON = {
        "deprecated": deprecated,
        "sets": [],
        "bans": []
      }
      inputJSON.sets.forEach((set) => {
        outputJSON.sets.push({
          "name": set.name,
          "codename": set.codename,
          "code": set.code,
          "symbol": {
            "common": `http://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&size=large&rarity=C&set=${set.code}`,
            "uncommon": `http://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&size=large&rarity=U&set=${set.code}`,
            "rare": `http://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&size=large&rarity=R&set=${set.code}`,
            "mythicRare": `http://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&size=large&rarity=M&set=${set.code}`,
          },
          "enterDate": {
            "exact": set.enter_date,
            "rough": set.rough_enter_date
          },
          "exitDate": {
            "exact": set.exit_date,
            "rough": set.rough_exit_date
          },
        })
      })
      inputJSON.bans.forEach((ban) => {
        outputJSON.bans.push({
          "cardName": ban.card_name,
          "cardImageUrl": ban.card_image_url,
          "setCode": ban.set_code,
          "reason": ban.reason,
          "announcementUrl": ban.announcement_url
        })
      })

      const outputBody = JSON.stringify(outputJSON, null, 2) + "\n"

      fs.writeFile(outputFile, outputBody, (err) => {
        if (err) throw err
      })
    })
  }
}
