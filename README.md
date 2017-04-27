# What's in Standard?
*[What's in Standard?][0]* is a simple reference page made to help new (or not new) Magic: The Gathering players easily
check which sets are currently in [Standard][1], see when the next rotation is going to happen, and understand how
rotations work.

## Development

### Running it locally
```bash
git clone git@github.com:glacials/whatsinstandard
cd whatsinstandard

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
npm install
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
[6]: https://github.com/glacials/whatsinstandard/blob/gh-pages/api
[7]: https://github.com/jninnes/mtgicons

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars2.githubusercontent.com/u/3375444?v=3" width="100px;"/><br /><sub>Matt Forster</sub>](http://mattforster.ca)<br />[💻](https://github.com/glacials/whatsinstandard/commits?author=forstermatth "Code") [📖](https://github.com/glacials/whatsinstandard/commits?author=forstermatth "Documentation") | [<img src="https://avatars0.githubusercontent.com/u/438911?v=3" width="100px;"/><br /><sub>Ben Carlsson</sub>](https://github.com/glacials)<br />[💬](#question-glacials "Answering Questions") [💻](https://github.com/glacials/whatsinstandard/commits?author=glacials "Code") [🎨](#design-glacials "Design") [📖](https://github.com/glacials/whatsinstandard/commits?author=glacials "Documentation") [💡](#example-glacials "Examples") [🚇](#infra-glacials "Infrastructure (Hosting, Build-Tools, etc)") | [<img src="https://avatars1.githubusercontent.com/u/621861?v=3" width="100px;"/><br /><sub>Tim Krajcar</sub>](http://www.twitter.com/TimKrajcar)<br />[💻](https://github.com/glacials/whatsinstandard/commits?author=tkrajcar "Code") [📖](https://github.com/glacials/whatsinstandard/commits?author=tkrajcar "Documentation") | [<img src="https://avatars3.githubusercontent.com/u/664174?v=3" width="100px;"/><br /><sub>Wesley</sub>](http://wstratto.ca)<br />[💻](https://github.com/glacials/whatsinstandard/commits?author=strattonw "Code") [📖](https://github.com/glacials/whatsinstandard/commits?author=strattonw "Documentation") | [<img src="https://avatars2.githubusercontent.com/u/552093?v=3" width="100px;"/><br /><sub>Kerrick Long</sub>](https://kerricklong.com/)<br />[💻](https://github.com/glacials/whatsinstandard/commits?author=Kerrick "Code") | [<img src="https://avatars2.githubusercontent.com/u/552093?v=3" width="100px;"/><br /><sub>Kerrick Long</sub>](https://kerricklong.com/)<br />[💻](https://github.com/glacials/whatsinstandard/commits?author=Kerrick "Code") | [<img src="https://avatars2.githubusercontent.com/u/318337?v=3" width="100px;"/><br /><sub>Valentin Baca</sub>](https://github.com/valbaca)<br />[💻](https://github.com/glacials/whatsinstandard/commits?author=valbaca "Code") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
