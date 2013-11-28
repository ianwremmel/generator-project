'use strict';

var http = require('http');

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

<% if (enableBrowserSupport) { %>
// Configure main asset routes
// ---------------------------
if (app.get('env') === 'development') {
  var path = require('path');

  var browserify = require('browserify-middleware');
  var less = require('less-middleware');

  app.get('/scripts/app.js', browserify('../app/scripts/app.js', {
    basedir: '.',
    noParse: ['jquery'],
    transform: ['debowerify']
  }));

  app.use(less({
    src: path.join(__dirname, '../app/styles')
  }));

  app.get('/', function(req, res) {
    res.sendfile(path.join(__dirname, '../app/index.html'));
  });
}
else {
  throw new Error('generator-project has not been configured to serve built files.');
}
<% } %>

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

// Start the server
// ----------------
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
