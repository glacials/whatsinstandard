#!/usr/bin/env node
'use strict'

import { readFile, writeFile } from 'fs'

const schemaUrl = 'https://whatsinstandard.com/api/v6/schema.json'
const inputFile = './api/internal.json'
const outputFile = './api/v6/standard.json'
const deprecated = false

export function generate() {
  readFile(inputFile, (err, inputBody) => {
    if (err)
      throw err

    const inputJSON = JSON.parse(inputBody)
    const outputJSON = {
      "$schema": schemaUrl,
      "deprecated": deprecated,
      "sets": [],
      "bans": []
    }

    // Technically, we only guarantee a superset of standard sets in the v6 API.
    // However, privately we want to get as close as possible to the exact set. This is
    // hard when we don't know the time zone of the consumer.
    //
    // Global time zones range from GMT -12 to GMT +14. To make a best effort, we'll
    // widen the standard format window by treating enters as occurring in GMT+14 time
    // and exits as occurring in GMT-12 time. This guarantees we'll return the minimal
    // possible set of sets while never excluding a set incorrectly, and having no time
    // zone information. The trade-off is changes have a 14-hour margin of error.
    //
    // This doesn't sound like much in months-long rotations, but it means a lot on the
    // weekend of rotation, when people can't remember which day of the weekend rotation
    // happens. It also means consumers will be displaying potentially 9 sets at a time,
    // which violates the rule that standard has 5–8 sets. And by making the response
    // correct most of the time, people aren't incentivized to do any filtering, which
    // will cause surprise for that weekend.
    const hour = 1000 * 60 * 60

    inputJSON.sets.filter((set) => {
      return (
        (Date.parse(set.enter_date) || Infinity) <= (Date.now() + (14 * hour)) &&
        (Date.parse(set.exit_date) || Infinity) > (Date.now() - (12 * hour))
      )
    }).forEach((set) => {
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
    inputJSON.bans.filter((ban) => {
      return outputJSON.sets.filter((set) => {
        return (
          (Date.parse(set.enter_date) || Infinity) <= Date.now() &&
          (Date.parse(set.exit_date) || Infinity) > Date.now()
        )
      }).map((set) => set.code).includes(ban.setCode).forEach((ban) => {
        outputJSON.bans.push({
          "cardName": ban.card_name,
          "cardImageUrl": ban.card_image_url,
          "setCode": ban.set_code,
          "reason": ban.reason,
          "announcementUrl": ban.announcement_url
        })
      })

      const outputBody = JSON.stringify(outputJSON, null, 2) + "\n"

      writeFile(outputFile, outputBody, (err) => {
        if (err)
          throw err
      })
    })
  })
}
