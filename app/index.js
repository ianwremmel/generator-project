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
  }, {
    type: 'confirm',
    name: 'enableServerSupport',
    message: 'Will this project provide its own server?',
    default: false
  }];

  this.prompt(prompts, function (props) {
    _.each(props, function(value, key) {
      this[key] = value;
    }, this);

    this.multiple = this.enableBrowserSupport && this.enableServerSupport;

    cb();
  }.bind(this));
};

ProjectGenerator.prototype.projectfiles = function projectfiles() {
  this.mkdir('src');
  if (this.enableTests) {
    this.mkdir('test');
  }
  this.copy('editorconfig', '.editorconfig');
  this.copy('LICENSE', 'LICENSE');

  this.template('_package.json', 'package.json');
  this.template('_gruntfile.coffee', 'Gruntfile.coffee');
};

ProjectGenerator.prototype.lib = function lib() {
// TODO lib needs to be branched: either it's a library project or it has a
// app and/or server.
};

ProjectGenerator.prototype.server = function server() {
  if (this.enableServerSupport) {
    this.template('server/_server.js', this.multiple ? 'src/server/server.js' : 'src/server.js');
    this.template('server/_jshintrc', this.multiple ? 'src/server/.jshintrc' : '.jshintrc');
  }
};

ProjectGenerator.prototype.app = function app() {
  if (this.enableBrowserSupport) {
    this.template('_bower.json', 'bower.json');

    this.copy('app/scripts/app.js', this.multiple ? 'src/app/scripts/app.js' : 'src/scripts/app.js');
    this.copy('app/styles/main.less', this.multiple ? 'src/app/styles/main.less' : 'src/styles/main.less');
    this.template('app/_index.html', this.multiple ? 'src/app/index.html' : 'src/index.html');

    this.copy('app/jshintrc', this.multiple ? 'src/app/.jshintrc' : '.jshintrc');
  }
};





