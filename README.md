# What's in Standard?
*[What's in Standard?][website]* is a simple reference page made to help new (or not new) Magic: The Gathering players easily
check which sets are currently in [Standard][standard-official], see when the next rotation is going to happen, and understand how
rotations work.

[website]: https://whatsinstandard.com/
[standard-official]: http://magic.wizards.com/en/content/standard-formats-magic-gathering

## Development
### Dependencies
- [yb][yb]

[yb]: https://github.com/yourbase/yb

### Running it locally
```sh
git clone git@github.com:glacials/whatsinstandard
cd whatsinstandard
yb build
yb exec
```

Then open [localhost:8080][localhost] in your browser!

[localhost]: http://localhost:8080

### Updating set information
If you're looking to add, remove, or change a set, you'll want to change [`api/internal.json`][api-internal] then run
```sh
yb build
```
to regenerate the API. This file is the source of truth for set information, as the website itself consumes the APIs
generated from this file.

[api-internal]: api/internal.json

#### Updating set icons
Set icons are supplied by [Keyrune][keyrune]. If a new set icon is not showing or is invalid, you just need to update
Keyrune:

```sh
npm update keyrune
```

Any pull requests that simply update Keyrune are welcomed and will be accepted!

#### Tests
The API has a few tests. They run on build, but you can run them separately with

```sh
yb build test
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

#### [/api/v6/standard.json][api]
This is the only API call we have. It returns something like this:

```json
{
  "deprecated": false,
  "sets": [
    {
      "name": "Kaladesh",
      "codename": "Lock",
      "code": "KLD",
      "symbol": {
        "common": "http://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&size=large&rarity=C&set=KLD",
        "uncommon": "http://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&size=large&rarity=U&set=KLD",
        "rare": "http://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&size=large&rarity=R&set=KLD",
        "mythicRare": "http://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&size=large&rarity=M&set=KLD"
      },
      "enterDate": {
        "exact": "2016-09-30T00:00:00.000"
      },
      "exitDate": {
        "exact": "2018-10-05T00:00:00.000",
        "rough": "Q4 2018"
      }
    },
    ...
  ],
  "bans": [
    {
      "cardName": "Rampaging Ferocidon",
      "cardImageUrl": "https://img.scryfall.com/cards/large/en/xln/154.jpg?1527429722",
      "setCode": "XLN",
      "reason": "Banned for being too effective a shutdown against counters to aggressive red (filling the board with small creatures and gaining life).",
      "announcementUrl": "https://magic.wizards.com/en/articles/archive/news/january-15-2018-banned-and-restricted-announcement-2018-01-15"
    },
    ...
  ]
}
```

The array is guaranteed to contain all sets currently in Standard, but also contains recently dropped sets and some
future sets. For API details including how to filter them, see [the API readme][api-readme].

[api]: https://whatsinstandard.com/api/v6/standard.json
[api-readme]: https://github.com/glacials/whatsinstandard/blob/main/api

## Attributions
Thanks to:

* For SVG images: [Keyrune][keyrune]
* For favicon: Nils Enevoldsen

[keyrune]: https://github.com/andrewgioia/keyrune
