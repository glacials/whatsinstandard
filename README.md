# What's in Standard?

*[What's in Standard?][0]* is a simple reference page made to help new (or not new) Magic: The Gathering players easily
check which sets are currently in [Standard][1], see when the next rotation is going to happen, and understand how the
yearly rotations work.

## Development

### Images

The only images used are the GitHub octocat and the MTG set symbols. Where possible these are SVGs, but often the most
recent set symbol isn't yet available in SVG (check [Robert's mtgimage.com][4]). In this situation we use the "large"
resolution image from Gatherer ([example][2]). Set symbols vary in width, so we standardize on a height of 21px and let
the widths behave how they want.

### Running it locally

[Bower][3] manages the Bootstrap CSS/JS, so you'll need it installed if you don't want the site to look like it's from
the 90s. But hey, if that's your thing I won't stop you.

```bash
git clone git@github.com:glacials/whatsinstandard
cd whatsinstandard
npm install -g bower # (if you don't already have it)
bower install
```

You shouldn't need to serve the files from any sort of web server. Opening `index.html` in a browser should work just
fine.

### Branches

Since we use Bower and we are hosted by GitHub, the `gh-pages` branch just reflects `master` after a `bower install`
happens. This way `master` retains separation from its dependencies (Bootstrap). `gh-pages` is the live site.

When a set is nearing release, there should be an additional branch which contains the site as it will be when the
release happens, and it should be named for the new set (e.g. `return-to-ravnica`). This branch should be in a state
that allows `master` to be fast-forwarded when a merge happens at 00:00 on release day.

### API

We've got an API. It's super slim and the output is written by hand but it works like a charm.

#### [/api/2/sets.json][4]

This is the only API call we have. It returns a JSON array of sets which looks something like this:

```json
[
  {
    "name": "Return to Ravnica",
    "block": "Return to Ravnica",
    "code": "RTR",
    "symbol": "http://whatsinstandard.com/img/rtr.jpg",
    "enter_date": "2012-10-05T00:00:00.000Z",
    "exit_date": "2014-09-26T00:00:00.000Z",
    "rough_exit_date": "late 2014"
  },
  ...
]
```

The array is guaranteed to contain all sets currently in Standard and no other sets (unlike the website, which shows
between one and three upcoming sets grayed out).

For API details see [the baby API readme][5]!

### Images

Set images are jpegs. This is dumb, but it's (for some reason) the format Wizards has them in. The ideal format here
would be SVGs, but 

### Contributing

Pull requests are welcome. If you have a change specific to an upcoming set release, pull request that branch directly.
Otherwise use `master`.

[0]: http://whatsinstandard.com/
[1]: http://www.wizards.com/magic/magazine/article.aspx?x=judge/resources/sfrstandard
[2]: http://gatherer.wizards.com/Handlers/Image.ashx?type=symbol&set=RTR&size=large&rarity=C
[3]: https://github.com/bower/bower
[4]: http://whatsinstandard.com/api/2/sets.json
[5]: https://github.com/glacials/whatsinstandard/blob/master/api
