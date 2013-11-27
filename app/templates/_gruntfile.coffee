# Generated on <%= (new Date()).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
module.expors = (grunt) ->
  require('load-grunt-tasks')(grunt)

  grunt.registerTask 'build' [
    'jshint'<% if (enableBrowserSupport) { %>
    'browserify'<% } %>
  ]
  <% if (enableTests) { %>
  grunt.registerTask 'test' [
    'build'
    # TODO configure the remainder of your test steps here
  ]
  <% } %>
  grunt.initConfig
    jshint:
      options:
        jshintrc: '.jshintrc'
      src: [
        'src/**/*.js'
      ]
    <% if (enableBrowserSupport) { %>
    browserify:
      dist:
        files: [
          'dist/<%= appname %>.js': 'src/index.js'
        ]
    <% } %>
