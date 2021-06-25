'use strict';

const chai = require('chai');
const expect = chai.expect;
chai.use(require('..'));

describe('chai-url', () => {

  describe('path', () => {

    it('matches paths on urls', () => {
      expect('http://example.com/foo/bar').to.have.path('/foo/bar');
    });

    it('does not match partial paths', () => {
      expect('http://example.com/foo/bar').not.to.have.path('/foo');
    });

    it('matches partial paths on urls if `contain` flag is present', () => {
      expect('http://example.com/foo/bar').to.contain.path('/foo');
    });

  });

  describe('hostname', () => {

    it('matches hostnames', () => {
      expect('http://example.com/foo/bar').to.have.hostname('example.com');
      expect('http://www.example.com/foo/bar').to.have.hostname('www.example.com');
    });

    it('does not match partial hostnames', () => {
      expect('http://www.example.com/foo/bar').not.to.have.hostname('example.com');
    });

    it('matches partial hostname on urls if `contain` flag is present', () => {
      expect('http://www.example.com/foo/bar').to.contain.hostname('example.com');
    });

    it('handles domain-less urls', () => {
      expect('/foo/bar').not.to.have.hostname();
    });

  });

  describe('protocol', () => {

    it('matches protocol', () => {
      expect('http://example.com/foo/bar').to.have.protocol('http');
    });

    it('doesn\'t matter if expected protocol has trailing : or not', () => {
      expect('http://example.com/foo/bar').to.have.protocol('http');
      expect('http://example.com/foo/bar').to.have.protocol('http:');
    });

    it('handles protocol-less urls', () => {
      expect('//example.com/foo/bar').not.to.have.protocol();
    });

  });

  describe('auth', () => {

    it('matches auth segment of urls', () => {
      expect('http://user:pass@example.com/foo/bar').to.have.auth('user:pass');
    });

    it('handles auth-less urls', () => {
      expect('http://example.com/foo/bar').not.to.have.auth();
    });

  });

  describe('hash', () => {

    it('matches hash segment of urls', () => {
      expect('http://example.com/foo/bar#section').to.have.hash('section');
      expect('#section').to.have.hash('section');
    });

    it('ignores leading # symbol', () => {
      expect('http://example.com/foo/bar#section').to.have.hash('section');
      expect('http://example.com/foo/bar#section').to.have.hash('#section');
    });

    it('handles hash-less urls', () => {
      expect('http://example.com/foo/bar').not.to.have.hash();
    });

  });

  describe('port', () => {

    it('matches port segment of urls', () => {
      expect('http://example.com:3000/').to.have.port(3000);
    });

    it('handles both string and numerical values', () => {
      expect('http://example.com:3000/foo/bar').to.have.port(3000);
      expect('http://example.com:3000/foo/bar').to.have.port('3000');
    });

    it('handles port-less urls', () => {
      expect('http://example.com/foo/bar').not.to.have.port();
    });

  });

});