var chai = require('chai');
var assert = chai.assert;

var _ = require('lodash');
var $ = require('jquery');

describe('the test suite', function() {
  it('runs', function() {
    assert.equal(1, 1);
  });

  it('has access to the window object', function() {
    assert.isDefined(window);
  });

  it ('has access to the console object', function() {
    assert.isDefined(console);
  });

  describe('require', function() {
    it('is synchronous', function() {
      assert.isDefined(_);
      assert.isFunction(_.keys);
    });
  });
});

<% if (includeExamples) { %>
// BEGIN EXAMPLE TEST
describe('the app', function() {
  it('loads before this test runs', function() {
    var main = $('#main');
    assert.equal(main.length, 1, 'The #main <div> was found on the page.');
    assert.equal(main.text(), 'It Works!');
  });
});
// END EXAMPLE TEST
<% } %>