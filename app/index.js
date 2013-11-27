'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('lodash');

var ProjectGenerator = module.exports = function ProjectGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ProjectGenerator, yeoman.generators.Base);

ProjectGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'confirm',
    name: 'enableTests',
    message: 'Will this project include a test suite?',
    default: true
  }, {
    type: 'confirm',
    name: 'enableBrowserSupport',
    message: 'Will this project run in a web browser?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    _.each(props, function(value, key) {
      this[key] = value;
    }, this);

    cb();
  }.bind(this));
};

ProjectGenerator.prototype.projectfiles = function projectfiles() {
  this.mkdir('src');
  if (this.enableTests) {
    this.mkdir('test');
  }

  this.copy('editorconfig', '.editorconfig');

  this.template('_package.json', 'package.json');
  if (this.enableBrowserSupport) {
    this.template('_bower.json', 'bower.json');
    this.copy('index.js', 'src/index.js');
  }
  this.template('_jshintrc', '.jshintrc');
  this.template('_gruntfile.coffee', 'Gruntfile.coffee');
};
