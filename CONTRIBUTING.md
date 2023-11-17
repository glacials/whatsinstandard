# Contributing

_What's in Standard?_ has three code bases.

- API and website (see below)
- Mobile apps (see [`./mobile`](./mobile))
- Autotweeter (see [`./firebase`](./firebase))

## API and website

The API and the website are served by the same server. The API is a set of static files
generated at deploy-time by various generator scripts in `api/`. The website is a Vue
JavaScript app that consumes the API.

### Dependencies

- [Node.js][node]

[node]: https://nodejs.org/

### Running locally

```sh
git clone git@github.com:glacials/whatsinstandard
cd whatsinstandard/web
npm install
npm start
```

Then open [localhost:8080][localhost] in your browser!

[localhost]: http://localhost:8080

### Common tasks

#### Updating sets

If you're looking to add, remove, or edit a set, you'll want to change
[`api/internal.json`][api-internal] then run

```sh
npm install
```

to regenerate each API version. This file is the source of truth for set information,
even for the website itself.

[api-internal]: api/internal.json

#### Editing the page

To change the layout of the page, use

#### Running tests

The API has a few tests. They run on build, but you can run them separately with

```sh
npm test
```

To autorun them whenever test files update, use

```sh
npm run autotest
```

#### Adding new set icons

Set icon SVGs are supplied by [Keyrune][keyrune]. When new icons are published, [a
bot][dependabot] should open a pull request automatically. If it doesn't for some
reason, you can run

```sh
npm update keyrune
```

and submit a pull request.

[dependabot]: .github/dependabot.yml
[keyrune]: https://github.com/andrewgioia/keyrune
