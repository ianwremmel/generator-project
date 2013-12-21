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
    name: 'enableServerSupport',
    message: 'Will this project provide its own server?',
    default: false
  }, {
    type: 'confirm',
    name: 'includeBackbone',
    message: 'Would you like Backbone installed?',
    default: false
  }, {
    type: 'confirm',
    name: 'includeBootstrap',
    message: 'Would you like Bootstrap installed?',
    default: false
  }, {
    type: 'confirm',
    name: 'includeExamples',
    message: 'Would you like to include examples?',
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

  this.copy('editorconfig', '.editorconfig');
  this.copy('LICENSE', 'LICENSE');

  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('_gruntfile.coffee', 'Gruntfile.coffee');
};

ProjectGenerator.prototype.server = function server() {
  this.mkdir('src/server');
  this.template('server/_server.js', 'src/server/server.js');
  this.template('server/_jshintrc', 'src/server/.jshintrc');
};

ProjectGenerator.prototype.app = function app() {
  this.mkdir('src/app');
  this.mkdir('src/app/images');
  this.mkdir('src/app/images/favicons');
  this.mkdir('src/app/scripts');
  this.mkdir('src/app/static');
  this.mkdir('src/app/styles');


  this.copy('src/app/images/favicons/favicon.png', 'src/app/images/favicons/favicon.png');

  this.template('src/app/scripts/_main.js', 'src/app/scripts/main.js');
  this.template('src/app/scripts/_shim.js', 'src/app/scripts/shim.js');

  this.template('src/app/static/_index.html', 'src/app/static/index.html');

  this.template('src/app/styles/_main.less', 'src/app/styles/main.less');
  if (this.includeBootstrap) {
    this.mkdir('src/app/styles/bootstrap');
    this.copy('src/app/styles/bootstrap/variables.less', 'src/app/styles/bootstrap/variables.less');
    this.copy('src/app/styles/local.less', 'src/app/styles/local.less');
  }

  this.copy('app/jshintrc', 'src/app/.jshintrc');
};

ProjectGenerator.prototype.test = function test() {
  if (this.enableTests) {
    this.mkdir('test');
    this.mkdir('test/spec');
    this.mkdir('test/unit');

    this.template('test/spec/_test.js', 'test/spec/test.js');
    this.template('test/unit/_test.js', 'test/unit/test.js');
  }
}
