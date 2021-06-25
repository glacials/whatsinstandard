# chai-url
A chai assertion plugin for working with urls

Provides a number of assertion helpers for working with urls.

## Usage

```js
const chai = require('chai');
chai.use(require('chai-url'));

chai.expect('http://example.com/foo/bar').to.have.path('/foo/bar');
chai.expect('http://example.com/foo/bar').to.have.protocol('http');
```

## Available matchers

* `path`
* `pathname`
* `port`
* `hostname`
* `protocol`
* `auth`
* `hash`

In each case, the property is tested against the corresponding property from node's [url.parse](https://nodejs.org/api/url.html#url_url_strings_and_url_objects) method.

In the case of `hash` and `protocol` properties which may be prefixed/suffixed with `#` and `:` respectively these characters are optional and will match with or without their presence.

## Partial matching

The `path`, `pathname`, `hostname`, `auth` and `hash` functions can also perform partial matching based on substrings by using a `contains` clause in the test statement.

```js
expect('http://example.com/foo/bar').to.contain.path('/foo');
```

## Examples

See the [tests for this module](./test/index.js) for further examples.
