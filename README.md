# What's in Standard?

*[What's in Standard?][0]* is a simple reference page made to help new (or not new)
Magic: The Gathering players easily check which sets are currently in
[Standard][1], see when the next rotation is going to happen, and understand
how the yearly rotations work.

## Development

### Code

The site is written in normal HTML/CSS and uses [Bootstrap][2] 3 CSS/JS (and
thus [jQuery][3]) with a couple of small CSS overrides.

The only images being used are the GitHub octocat and the MTG set symbols. Set
images which are no longer being displayed on the page should be removed from
the repository.

### Versioning

GitHub Pages hosts the web page, so treat `gh-pages` as master. There should
always be at least one additional branch which contains the site as it will be
when the next MTG set release happens, and it should be named after the set
(e.g. `return-to-ravnica`). Changes from `gh-pages` which aren't specific to a
set release should be merged into this branch often so that it will be ready to
be auto-merged back into `gh-pages` at 00:00 on release day.

### Contributing

Pull requests are welcome! If you have a change not specific to a set release,
pull request `gh-pages`. Otherwise, pull request the branch corresponding to
the set release your change is for. If it applies to several, mention so and
use the branch which would be merged into gh-pages first.

[0]: http://whatsinstandard.com/
[1]: http://www.wizards.com/magic/magazine/article.aspx?x=judge/resources/sfrstandard
[2]: https://github.com/twbs/bootstrap
[3]: https://github.com/jquery/jquery
[4]: http://gatherer.wizards.com/
