## API
Hey, welcome to this super awesome API. It has one endpoint! Here is an example request:

```sh
curl whatsinstandard.com/api/v5/sets.json
```

This will return something like:

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

But you can just [visit it yourself][1] to see everything. You'll get some JSON containing an array of Magic sets and
banned cards.

### Sets
Each set in the `sets` array has these fields:

| field             | type                                                | description                               |
|:------------------|:----------------------------------------------------|:------------------------------------------|
| `name`            | string                                              | human-readable name of the set            |
| `block`           | string, or null if the set is blockless             | human-readable name of the set's block    |
| `code`            | string (matching regex `/^[A-Z0-9]{3}$/`)           | official three-character code of the set  |
| `enter_date`      | string (ISO 8601), or null if not exactly known     | release date of the set                   |
| `exit_date`       | string (ISO 8601), or null if not exactly known     | date the set exits Standard               |
| `rough_exit_date` | string (matching regex <code>/^Q\d 20\d\d$/</code>) | rough time of year the set exits Standard |

The sets array is in order of release (aka `enter_date`), from oldest set to newest. It contains a superset of all sets
in Standard -- it may contain some sets that have dropped and some sets that have not yet released. It is your
responsibility to filter these sets out by comparing each set's `enter_date` and `exit_date` to the current date.

Here's a JavaScript function that does just that:
```javascript
const standardSets = callback => {
  fetch('https://whatsinstandard.com/api/v5/sets.json').then(response => response.json().then(body => {
    callback(body.sets.filter(set => {
      return ((Date.parse(set.enter_date) || Infinity) <= Date.now())
          && ((Date.parse(set.exit_date)  || Infinity) >  Date.now())
    }))
  }))
}
```

[1]: https://whatsinstandard.com/api/v5/sets.json

### Banned Cards
Each ban in the `bans` array has these fields:

| field              | type                                             | description                                       |
|:-------------------|:-------------------------------------------------|:--------------------------------------------------|
| `card_name`        | string                                           | human-readable English name of the card           |
| `card_image_url`   | string (URL)                                     | URL for the card image                            |
| `set_code`         | string (matching regex `/^[A-Z0-9]{3}$/`)        | three-character code of the card's Standard set   |
| `reason`           | string (complete sentence in English)            | human-readable summary of the reason for this ban |
| `announcement_url` | string (URL)                                     | URL to the official announcement of this ban      |

The bans array is in order of ban, from oldest ban to newest. It contains a superset of all bans in Standard -- it may
contain some bans that belong to sets that have dropped. It is your responsibility to filter these bans out by
correlating each ban's `set_code` to a `code` from a set included in the `sets` array, filtered to exclude non-Standard
sets (see above).

Here's a JavaScript function that does just that:
```javascript
const bannedCards = callback => {
  fetch('https://whatsinstandard.com/api/v5/sets.json').then(response => response.json().then(body => {
    callback(body.bans.filter(ban => {
      return body.sets.filter(set => {
        return ((Date.parse(set.enter_date) || Infinity) <= Date.now())
            && ((Date.parse(set.exit_date)  || Infinity) >  Date.now())
      }).map(set => set.code).includes(ban.set_code)
    }))
  }))
}
```

### Set images
You can fetch set images from Gatherer by inserting the set's `code` into this URL template:

    http://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&size=large&rarity=C&set=CODE_GOES_HERE

You can change the `rarity` parameter to any of `C`, `U`, `R`, or `M` to get the set image for common, uncommon, rare,
or mythic rare rarities respectively.

### Canary Deprecation
When using the API, you should always check the root object's boolean field `deprecated`, which will flip on if that API
version becomes deprecated. Configure your program to notify you if this field is ever `true` so you aren't caught off
guard if the version you use is deprecated then eventually killed.

API v1 through v4 are past deprecation and no longer available.

#### Changelog

##### Version 5
* The root element in the response is now an object, not an array. The root object's `sets` field is the array.
* Added a new `deprecated` field to the root object. This field will be `false` until v6 of the API is introduced, which
  will flip it to `true`.
* The API base path has changed from `whatsinstandard.com/api/\d` to `whatsinstandard.com/api/v\d` to be more consistent
  with the rest of the internet.
* Like upcoming sets in v4, sets that have rotated out of Standard can now be included in the sets array. There is no
  guarantee about the number of these sets included (though it will generally be single-digit). You should filter on
  `enter_date` and `exit_date` if you care only about the sets currently in Standard.
* `enter_date` can now be null to allow for upcoming sets whose release dates are not known.
* `block` can now be null to allow for new [blockless sets][2].
###### Midversion nonbreaking changes
* **2018-04-28:** `enter_date` and `exit_date` no longer include timezone (see #75). The dates are still ISO 8601
  compatible and are now intended to be parsed in the local timezone.
* **2019-02-28:** Documentation for `code` now correctly states it matches `/[A-Z0-9]{3}/`. It previously incorrectly
  stated that it matched `/[A-Z]{3}/`. No behavior has changed, only documentation.
* **2019-02-28:** Banned cards are now included in API.

[2]: http://magic.wizards.com/en/articles/archive/making-magic/metamorphosis-2-0-2017-06-12

##### Version 4
* Upcoming sets are once again included in the sets array. To use only released sets or only unreleased sets, filter on
  `enter_date`.
* `block` can no longer be `null`, as no more core sets will enter Standard.
* The `symbol` field has been removed to decrease maintenance work. If you'd like still like to fetch set images, you
  can instead use the `code` field to construct an image URL like
  `http://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&set=<code>&size=large&rarity=C`.
* `rough_exit_date` regex has changed from `/(early\/mid|late) 20\d\d/` to `/Q\d 20\d\d/` for simplicity.

##### Version 3
Valid `rough_exit_date` regex has changed from `/(early|late) 20\d\d/` to `/(early\/mid|late) 20\d\d/` to account for
the new Standard rotation style. Old API versions will continue to match their respective regexes, but with potentially
less accuracy. See Wizards's [article on the change][3] for details.

[3]: http://magic.wizards.com/en/articles/archive/mm/metamorphosis

##### Version 2
Upcoming unreleased sets are no longer included in the sets array.

## Contributing
If you're making changes to the API, note that the `api/v*/sets.json` files are generated programmatically by
`api/v*/generate.js` scripts. The scripts read the unstable `api/internal.json` file in this directory and output
version-stable JSON.

In other words: `api/internal.json` is the database, `api/v*/generate.js` is the view, and `api/v*/sets.json` is the
generated output.

Run
```sh
npm install
```
to regenerate the endpoints.
