# What's in Standard?
*[What's in Standard?][website]* is a simple reference page made to help new (or not new) Magic: The Gathering players easily
check which sets are currently in [Standard][standard-official], see when the next rotation is going to happen, and understand how
rotations work.

[website]: https://whatsinstandard.com/
[standard-official]: http://magic.wizards.com/en/content/standard-formats-magic-gathering 

## Development
### Running it locally
```sh
git clone git@github.com:glacials/whatsinstandard
cd whatsinstandard

# macOS
open index.html

# Linux
xdg-open index.html
```

You shouldn't need to serve the files from a web server. Opening `index.html` in a browser should work just fine.

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
      "name": "Battle for Zendikar",
      "block": "Battle for Zendikar",
      "code": "BFZ",
      "enter_date": "2015-10-02T00:00:00.000Z",
      "exit_date": "2017-09-29T00:00:00.000Z",
      "rough_exit_date": "Q4 2017"
    },
    ...,
  ]
{
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

[jninnes]: https://github.com/jninnes/mtgicons
