# What's in Standard?
*[What's in Standard?][website]* is a simple reference page made to help new (or not new) Magic: The Gathering players easily
check which sets are currently in [Standard][standard-official], see when the next rotation is going to happen, and understand how
rotations work.

[website]: https://whatsinstandard.com/
[standard-official]: http://magic.wizards.com/en/content/standard-formats-magic-gathering 

## Development
### Dependencies
- [npm][npm]

[npm]: https://github.com/npm/npm

### Running it locally
```sh
git clone git@github.com:glacials/whatsinstandard
cd whatsinstandard
npm install
npm start
```

Then open [localhost:8080][localhost] in your browser!

[localhost]: http://localhost:8080

### Updating Set Information
If you're looking to add, remove, or change a set, you'll want to change [`api/internal.json`][api-internal] then run
```sh
npm install
```
to regenerate the API. This file is the source of truth for set information, as the website itself consumes the APIs
generated from this file.

[api-internal]: api/internal.json

#### Tests
The API has a few tests. You can run them with

```sh
npm test
```

To autorun them whenever test files update, use

```sh
npm run autotest
```

### Tech
*What's in Standard?* uses [Vue.js][vue], a lightweight JavaScript framework. It fetches the setlist from its own API
and filters it based on release and drop dates.

[vue]: https://vuejs.org/

### API
We've got an API. It's super slim and the output is written by hand but it works like a charm.

#### [/api/v5/sets.json][api]
This is the only API call we have. It returns something like this:

```json
{
  "deprecated": false,
  "sets": [
    {
      "name": "Kaladesh",
      "block": "Kaladesh",
      "code": "KLD",
      "enter_date": "2016-09-30T00:00:00.000",
      "exit_date": "2018-10-05T00:00:00.000",
      "rough_exit_date": "Q4 2018"
    },
    ...
  ],
  "bans": [
    {
      "card_name": "Rampaging Ferocidon",
      "card_image_url": "https://img.scryfall.com/cards/large/en/xln/154.jpg?1527429722",
      "set_code": "XLN",
      "reason": "Banned for being too effective a shutdown against counters to aggressive red (filling the board with small creatures and gaining life).",
      "announcement_url": "https://magic.wizards.com/en/articles/archive/news/january-15-2018-banned-and-restricted-announcement-2018-01-15"
    },
    ...
  ]
}
```

The array is guaranteed to contain all sets currently in Standard, but also contains recently dropped sets and some
future sets. For API details including how to filter them, see [the API readme][api-readme].

[api]: https://whatsinstandard.com/api/v5/sets.json
[api-readme]: https://github.com/glacials/whatsinstandard/blob/master/api

## Attributions
Thanks to:

* For SVG set icon images:
  * BaconCatBug
  * White Dragon
  * Goblin Hero
  * Skibulk
  * Baka-Neku
  * Qanadhar
  * Poopski
* For gathering them: [jninnes][jninnes]
* For favicon: Nils Enevoldsen

[jninnes]: https://github.com/jninnes/mtgicons
