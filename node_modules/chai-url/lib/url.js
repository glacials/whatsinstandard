'use strict';

const url = require('url');
const props = [
  'path',
  'pathname',
  'port',
  'hostname',
  'protocol',
  'auth',
  'hash'
];

const matchers = {
  protocol: (expected, actual, contains) => {
    if (contains) {
      console.warn('chai-url: `contains` flag should not be used with protocol matching and will be ignored');
    }
    return expected === actual || expected + ':' === actual;
  },
  hash: (expected, actual, contains) => {
    return matchers.default(expected, actual, contains) || matchers.default('#' + expected, actual, contains);
  },
  port: (expected, actual, contains) => {
    if (contains) {
      console.warn('chai-url: `contains` flag should not be used with port matching and will be ignored');
    }
    return expected === actual || expected === parseInt(actual, 10);
  },
  default: (expected, actual, contains) => {
    return contains ? actual.includes(expected) : actual === expected;
  }
};

module.exports = function (chai, utils) {
  const Assertion = chai.Assertion;

  props.forEach(prop => {
    Assertion.addMethod(prop, function (value) {
      const str = this._obj;

      // if url isn't a string we cannot continue
      new Assertion(str).to.be.a('string');

      const parsed = url.parse(str);
      const contains = utils.flag(this, 'contains');
      const matcher = matchers[prop] || matchers.default;
      const match = matcher(value, parsed[prop], contains);
      this.assert(
        match,
        `expected #{this} to have ${prop} #{exp} but got #{act}`,
        `expected #{this} to not to have ${prop} #{act}`,
        value,
        parsed[prop]
      );
    });
  });
};
