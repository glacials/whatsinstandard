# chai-json-schema

[![npm:](https://img.shields.io/npm/v/chai-json-schema.svg?style=flat-square)](https://www.npmjs.com/packages/chai-json-schema)
[![build:?](https://img.shields.io/travis/chaijs/chai-json-schema.svg?style=flat-square)](https://travis-ci.org/chaijs/chai-json-schema)
[![dependencies:?](https://img.shields.io/npm/dm/chai-json-schema.svg?style=flat-square)](https://www.npmjs.com/packages/chai-json-schema)
[![dependencies:?](https://img.shields.io/david/chaijs/chai-json-schema.svg?style=flat-square)](https://david-dm.org/chaijs/chai-json-schema)
[![devDependencies:?](https://img.shields.io/david/dev/chaijs/chai-json-schema.svg?style=flat-square)](https://david-dm.org/chaijs/chai-json-schema)

> [Chai](http://chaijs.com/) plugin with assertions to validate values against [JSON Schema v4](http://json-schema.org/).

Assert both simple values and complex objects with the rich collection of [validation terms](http://json-schema.org/latest/json-schema-validation.html) ([examples](http://json-schema.org/examples.html)).

For general help with json-schema see this excellent [guide](http://spacetelescope.github.io/understanding-json-schema/) and usable [reference](http://spacetelescope.github.io/understanding-json-schema/reference/index.html).

## Notes

JSON Schema validation is done by [Tiny Validator tv4](https://github.com/geraintluff/tv4).

It seems that tv4 is not actively developed anymore, nor does it support versions of JSON schema after draft-04.
However this chai plugin will use tv4 as its backend for the forseeable future. If you want newer versions of the JSON-schema or more performance you could look at using
[ajv](https://github.com/epoberezkin/ajv) in conjunction with [chai-json-schema-ajv](https://github.com/up9cloud/chai-json-schema-ajv)

The assertion will fail if a schema use a `$ref` to a schema that is not added before the assertion is called. Use `chai.tv4.addSchema(uri, schema)` to preset schemas.

JSON Schema's main use-case is validating JSON documents and API responses, but it is also a powerful way to describe and validate *any* JavaScript value or object.


## Usage


### server-side

Install from npm:

````bash
$ npm install chai-json-schema
````

Have chai use the chai-json-schema module:

````js
var chai = require('chai');
chai.use(require('chai-json-schema'));
````

### browser-side

Using globals:

Include chai-json-schema after [jsonpointer.js](https://github.com/alexeykuzmin/jsonpointer.js/), [Tiny Validator tv4](https://github.com/geraintluff/tv4) and [Chai](http://chaijs.com/):

````html
<script src="jsonpointer.js"></script>
<script src="tv4.js"></script>
<script src="chai.js"></script>
<script src="chai-json-schema.js"></script>
````

Install from bower:

````bash
$ bower install chai-json-schema
````

The module supports CommonJS, AMD and browser globals. You might need to shim `tv4`'s global and make sure  `jsonpointer.js` can be required as `'jsonpointer'`.

## Assertions

### jsonSchema(value, schema)

Validate that the given javascript value conforms to the specified JSON Schema. Both the value and schema would likely be JSON loaded from an external datasource but could also be literals or object instances.

````js
var goodApple = {
  skin: 'thin',
  colors: ['red', 'green', 'yellow'],
  taste: 10
};
var badApple = {
  colors: ['brown'],
  taste: 0,
  worms: 2
};
var fruitSchema = {
  title: 'fresh fruit schema v1',
  type: 'object',
  required: ['skin', 'colors', 'taste'],
  properties: {
    colors: {
      type: 'array',
      minItems: 1,
      uniqueItems: true,
      items: {
        type: 'string'
      }
    },
    skin: {
      type: 'string'
    },
    taste: {
      type: 'number',
      minimum: 5
    }
  }
};

//bdd style
expect(goodApple).to.be.jsonSchema(fruitSchema);
expect(badApple).to.not.be.jsonSchema(fruitSchema);

goodApple.should.be.jsonSchema(fruitSchema);
badApple.should.not.be.jsonSchema(fruitSchema);

//tdd style
assert.jsonSchema(goodApple, fruitSchema);
assert.notJsonSchema(badApple, fruitSchema);
````

## Additional API

The `tv4` instance is 'exported' as `chai.tv4` and can be accessed to add schemas for use in validations:

````js
chai.tv4.addSchema(uri, schema);
````

There are other useful methods:

````js
var list = chai.tv4.getMissingUris();
var list = chai.tv4.getMissingUris(/^https?:/);

var list = chai.tv4.getSchemaUris();
var list = chai.tv4.getSchemaUris(/example.com/);

var schema = chai.tv4.getSchema('http://example.com/item');
var schema = chai.tv4.getSchema('http://example.com/item/#sub/type');

chai.tv4.dropSchemas();
````

For more API methods and info on the validator see the [tv4 documentation](https://github.com/geraintluff/tv4#api).

### Non-standard tv4 properties

**Cyclical objects**

This will be passed to the internal `tv4` validate call to enable [support for cyclical objects](https://github.com/geraintluff/tv4#cyclical-javascript-objects). It allows tv4 to validate normal javascipt structures (instead of pure JSON) without risk of entering a loop on cyclical references.

````js
chai.tv4.cyclicCheck = true;
````

This is slightly slower then regular validation so it is disabled by default.

**Ban unknown properties**

````js
chai.tv4.banUnknown = true;
````

Passed to the internal `tv4` validate call makes validation fail on unknown schema properties. Use this to make sure your schema do not contain undesirable data.

**Validate multiple errors**

````js
chai.tv4.multiple = true;
````

Call `tv4.validateMultiple` for validation instead of `tv4.validateResult`. Use this if you want see all validation errors.


### Remote references

Due to the synchronous nature of assertions there will be no support for dynamically loading remote references during validation.

Use the asynchronous preparation feature of your favourite test runner to preload remote schemas:

````js
// simplified example using a bdd-style async before();
// as used in mocha, jasmine etc.

before(function (done) {

  // iterate missing
  var checkMissing = function (callback) {
    var missing = chai.tv4.getMissingUris();
    if (missing.length === 0) {
      // all $ref's solved
      callback();
      return;
    }
    // load a schema using your favourite JSON loader
    // (jQuery, request, SuperAgent etc)
    var uri = missing.pop();
    myFavoriteJsonLoader.load(uri, function (err, schema) {
      if (err || !schema) {
        callback(err || 'no data loaded');
        return;
      }
      // add it
      chai.tv4.addSchema(uri, schema);
      // iterate
      checkMissing(callback);
    });
  };

  // load first instance manually
  myFavoriteJsonLoader.load(uri, function (err, schema) {
    if (err || !schema) {
      done(err || 'no data loaded');
      return;
    }
    // add it
    chai.tv4.addSchema(uri, schema);

    // start checking
    checkMissing(done);
  });
});
````

## History
See [Releases](https://github.com/chaijs/chai-json-schema/releases).

## Build

Install development dependencies in your git checkout:

````bash
$ npm install
````

You need the global [grunt](http://gruntjs.com) command:

````bash
$ npm install grunt-cli -g
````

Build and run tests:

````bash
$ grunt
````

See the `Gruntfile` for additional commands.

## License

Copyright (c) 2013 Bart van der Schoor

Licensed under the MIT license.

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/Bartvds/chai-json-schema/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
