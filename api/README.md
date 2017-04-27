## API v4
Hey, welcome to this super awesome API. It's generated by me, a human. It has one endpoint! Here is an example request:

```bash
curl whatsinstandard.com/api/4/sets.json
```

This will return something like:

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

But you can just [visit it yourself][1] to see everything. You'll get some JSON containing an array of Magic sets. Each
set has some fields:

| field             | type                                             | description                               |
|:------------------|:-------------------------------------------------|:------------------------------------------|
| `name`            | string                                           | human-readable name of the set            |
| `block`           | string                                           | human-readable name of the set's block    |
| `code`            | string, matching regex `/[A-Z]{3}/`              | official three-character code of the set  |
| `enter_date`      | string                                           | release date of the set                   |
| `exit_date`       | string, or `null` if not exactly known           | date the set exits Standard, if known     |
| `rough_exit_date` | string, matching regex <code>/Q\d 20\d\d/</code> | rough time of year the set exits Standard |

The sets array is in order of release (aka `enter_date`), from oldest set to newest. It contains all sets in Standard as
well as the next two or three sets to enter Standard. You can use `enter_date` to filter the list into only-released (or
only-unreleased) sets by comparing it to today's date.

### Set images
You can fetch set images from Gatherer by inserting the set's `code` into this URL template:

    http://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&size=large&rarity=C&set=CODE_GOES_HERE

You can change the `rarity` parameter to any of `C`, `U`, `R`, or `M` to get the set image for common, uncommon, rare,
or mythic rare rarities respectively.

### Versioning
API v1, v2, and v3 are past deprecation and no longer available.

When implementing support for v4, you should check for a 404 status and alert yourself when receiving one, as this will
be how v4 will eventually break after v5 has been introduced. Starting with v5, response bodies will be structured to
allow smooth deprecation.

#### Changelog

##### Version 4
* Upcoming sets are once again included in the sets array. To use only released sets or only unreleased sets, filter on
  `enter_date`.
* `block` can no longer be `null`, as no more core sets will enter Standard.
* The `symbol` field has been removed to decrease maintenance work. If you'd like still like to fetch set images, you
  can instead use the `code` field to construct an image URL like
  `http://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&set=<code>&size=large&rarity=C`.
* `rough_exit_date` regex has changed from `/(early\/mid|late 20\d\d/` to `/Q\d 20\d\d/` for simplicity.

##### Version 3
Valid `rough_exit_date` regex has changed from `/(early|late) 20\d\d/` to `/(early\/mid|late) 20\d\d/` to account for
the new Standard rotation style. Old API versions will continue to match their respective regexes, but with potentially
less accuracy. See Wizards's [article on the change][2] for details.

##### Version 2
Upcoming unreleased sets are no longer included in the sets array.

[1]: http://whatsinstandard.com/api/3/sets.json
[2]: http://magic.wizards.com/en/articles/archive/mm/metamorphosis