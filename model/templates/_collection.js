'use strict';

var Backbone = require('backbone');

var <%= name %>Model = require('../models/<%= _.slugify(name) %>.js');

module.exports = Backbone.Collection.extend({
  model: <%= name %>Model
});
