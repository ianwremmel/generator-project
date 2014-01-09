'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var ModelGenerator = module.exports = function ModelGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(ModelGenerator, yeoman.generators.NamedBase);

ModelGenerator.prototype.files = function files() {
  this.template('_model.js', 'src/app/scripts/models/' + this._.slugify(this.name) + '.js');
  if (!this.options['skip-collection']) {
    this.template('_collection.js', 'src/app/scripts/collections/' + this._.slugify(this.name) + 's.js');
  }
};
