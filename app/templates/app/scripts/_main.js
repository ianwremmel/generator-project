/**
 * Main entrypoint into the application.
 */

'use strict';

require('./shim');

<% if (includeExamples) { %>
// BEGIN EXAMPLE CODE
// ------------------
// The following code demonstrates how to put a basic view on a page. Generally
// speaking, this code should be defined in at least one other file.

var Backbone = require('backbone');
var _ = require('lodash');

var View = Backbone.View.extend({
  template: _.template('<div title="it works" data-toggle="tooltip" data-placement="bottom">It Works!</div>'),

  el: '#main',

  render: function() {
    this.$el.html(this.template());
    this.$('div').tooltip();
    return this;
  }
});

var view = new View();
view.render();
// END EXAMPLE CODE
// ----------------
<% } %>
