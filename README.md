# What's in Standard?
*[What's in Standard?][0]* is a simple reference page made to help new (or not new) Magic: The Gathering players easily
check which sets are currently in [Standard][1], see when the next rotation is going to happen, and understand how
rotations work.

## Development

### Running it locally
```bash
git clone git@github.com:glacials/whatsinstandard
cd whatsinstandard
npm install

# OS X
open index.html

# Linux
xdg-open index.html
```

You shouldn't need to serve the files from any sort of web server. Opening `index.html` in a browser should work just
fine.

#### Tests
The API has a few tests. You can run them with

```bash
npm test
```

To autorun them whenever test files update, use

```bash
npm run autotest
```

### API
We've got an API. It's super slim and the output is written by hand but it works like a charm.

#### [/api/4/sets.json][5]

This is the only API call we have. It returns a JSON array of sets which looks something like this:

```json
[
  {
    "name": "Battle for Zendikar",
    "block": "Battle for Zendikar",
    "code": "BFZ",
    "enter_date": "2015-10-02T00:00:00.000Z",
    "exit_date": "2017-04-28T00:00:00.000Z",
    "rough_exit_date": "Q2 2017"
  },
  ...
]
```

The array is guaranteed to contain all sets currently in Standard plus the next two to three unreleased sets.

For API details see [the API readme][6].

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
* For gathering them: [jninnes][7]

[0]: http://whatsinstandard.com/
[1]: http://magic.wizards.com/en/content/standard-formats-magic-gathering 
[2]: http://mtgimage.com/
[3]: http://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&set=RTR&size=large&rarity=C
[4]: https://github.com/bower/bower
[5]: http://whatsinstandard.com/api/4/sets.json
[6]: https://github.com/glacials/whatsinstandard/blob/master/api
[7]: https://github.com/jninnes/mtgicons
