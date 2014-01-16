# What's in Standard?

*[What's in Standard?][0]* is a simple reference page made to help new (or not new)
Magic: The Gathering players easily check which sets are currently in
[Standard][1], see when the next rotation is going to happen, and understand
how the yearly rotations work.

## Development

### Code

The site uses [Bootstrap][2] 3 CSS/JS (and thus [jQuery][3]) with a couple of
small CSS overrides.

The only images being used are the GitHub octocat and the MTG set symbols. Set
images which are no longer being displayed on the page should be removed from
the repository.

### Running it locally

[Bower][4] manages the Bootstrap CSS/JS, so you'll need it installed if you
don't want the site to look like it's from the 90s. But hey, if that's your
thing I won't stop you.

    npm install -g bower
    bower install

You shouldn't need to serve the files from any sort of web server. Opening
`index.html` in a browser should work just fine.

### Branches

Since we use Bower and we are hosted by GitHub, the `gh-pages` branch just
reflects `master` after a `bower install` happens. This way `master` retains
separation from its dependencies (Bootstrap). `gh-pages` is the live site.

When a set is nearing release, there should be an additional branch which
contains the site as it will be when the next release happens, and it should be
named for the set (e.g. `return-to-ravnica`). Changes to `master` that happen
while this branch exists should be merged into it liberally so that we can
fast-forward `master` and `gh-pages` at 00:00 on release day.

### Contributing

Pull requests are welcome. If you have a change specific to an upcoming set
release, pull request that branch directly. Otherwise use `master`.

[0]: http://whatsinstandard.com/
[1]: http://www.wizards.com/magic/magazine/article.aspx?x=judge/resources/sfrstandard
[2]: https://github.com/twbs/bootstrap
[3]: https://github.com/jquery/jquery
[4]: https://github.com/bower/bower
