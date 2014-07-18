# What's in Standard?

*[What's in Standard?][0]* is a simple reference page made to help new (or not new) Magic: The Gathering players easily
check which sets are currently in [Standard][1], see when the next rotation is going to happen, and understand how the
yearly rotations work.

## Development

### Code

The site uses [Bootstrap][2] 3 CSS/JS (and thus [jQuery][3]) with a couple of small CSS overrides.

The only images being used are the GitHub octocat and the MTG set symbols. Set images which are no longer being
displayed on the page should be removed from the repository.

### Running it locally

[Bower][4] manages the Bootstrap CSS/JS, so you'll need it installed if you don't want the site to look like it's from
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

#### [/api/2/sets.json](http://whatsinstandard.com/api/2/sets.json)

This is the only API call we have. It returns a JSON array of sets which looks something like this:

```json
[
  {
    "name": "Return to Ravnica",
    "block": "Return to Ravnica",
    "code": "RTR",
    "symbol": "http://whatsinstandard.com/img/rtr.jpg",
    "enter_date": "2012-10-05T00:00:00.000Z",
    "exit_date": null,
    "rough_exit_date": "late 2014"
  },
  ...
]
```

The array is guaranteed to contain all sets currently in Standard and no other sets (unlike the website, which shows
between one and three upcoming sets grayed out).

`enter_date` and `exit_date` represent when a set respectively enters and exits Standard. They can be `null` when they
are not known with day-level precision.  `rough_exit_date` will always hold the form `early 20xx`, `mid 20xx`, or `late
20xx`. It will never be `null`.

#### Versioning

I only list the most recent version of the API above. All previous versions are deprecated gradually -- sets that fall
out of Standard are removed from them properly, but newly-released sets are never added. So, all non-current API
versions will eventually just return `[]`.

### Contributing

Pull requests are welcome. If you have a change specific to an upcoming set release, pull request that branch directly.
Otherwise use `master`.

[0]: http://whatsinstandard.com/
[1]: http://www.wizards.com/magic/magazine/article.aspx?x=judge/resources/sfrstandard
[2]: https://github.com/twbs/bootstrap
[3]: https://github.com/jquery/jquery
[4]: https://github.com/bower/bower
