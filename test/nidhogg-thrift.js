'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-thriftster:nidhogg-thrift', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/nidhogg-thrift'))
      .withPrompts({someAnswer: true})
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'dummyfile.txt'
    ]);
  });
});
