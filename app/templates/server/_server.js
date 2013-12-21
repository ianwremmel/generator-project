'use strict';

var http = require('http');
var path = require('path');

var express = require('express');

var app = express();

// Enable Logging
// --------------
if (app.get('env') === 'development') {
  app.use(express.logger({
    format: 'dev',
    immediate: true
  }));
}
else {
  // Tiny should be the same as dev, but without color (some log aggregators may
  // not handle the color codes properly).
  app.use(express.logger('tiny'));
}

// Enable gzip/deflate
// -------------------
app.use(express.compress());

// Configure main asset routes
// ---------------------------
app.configure('development', <% if (enableTests) { %>'testing'<% } %>, function() {
  var browserify = require('browserify-middleware');
  var less = require('less-middleware');

  if (app.get('env') === 'testing') {
    var testEnv = browserify.settings.env('test');
    testEnv({
      cache: false,
      minify: false,
      gzip: false,
      debug: true
    });

    app.use('/bower_components', express.static(path.join(__dirname, '../../bower_components')));
    app.use('/node_modules', express.static(path.join(__dirname, '../../node_modules')));

    <% if (enableTests) { %>
    app.get('/scripts/test.js', browserify('../../test/spec/test.js', {
      basedir: '.',
      noParse: ['jquery'],
      transform: ['debowerify']
    }));
    <% } %>
  }

  app.get('/scripts/app.js', browserify('../app/scripts/app.js', {
    basedir: '.',
    noParse: ['jquery'],
    transform: ['debowerify']
  }));

  app.use(less({
    debug: true,
    prefix: '/styles',
    dest: path.join(__dirname, '../../dist/app/styles'),
    src: path.join(__dirname, '../app/styles')
  }));

  app.use(express.favicon(path.join(__dirname, '../app/images/favicons/favicon.png')));
});

<% if (enableServerSupport) %>
app.configure('production', function() {
  app.use(express.favicon(path.join(__dirname, '../../dist/app/images/favicons/favicon.ico')));
});
<% } %>

app.use(express.static(path.join(__dirname, '../../dist/app')));

<% if (enableServerSupport) %>
// Enable full HTTP support
// ------------------------

// Automatically turn JSON into req.body.
app.use(express.json());

// Automatically turn query string parameters into req.query.
app.use(express.query());

// Uncomment the following line to support normal HTML forms.
// app.use(express.urlencoded());

// Uncomment the following line to support cookies.
// app.use(express.cookieParser());

// If you need session support, take a look at the documentation at
// http://www.senchalabs.org/connect/ for more information.

<% } %>
// Start the server
// ----------------
var port = app.get('port') || 3000;
http.createServer(app).listen(port, function(){
  console.log('Express server listening on port ' + port);
});
