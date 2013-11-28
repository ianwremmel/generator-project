# Generated on <%= (new Date()).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
module.expors = (grunt) ->
  require('load-grunt-tasks')(grunt)

  grunt.registerTask 'build', [
    'jshint'<% if (enableBrowserSupport) { %>
    'browserify'<% } %>
  ]
  <% if (enableTests) { %>
  grunt.registerTask 'test', [
    'build'
    'mochacli'
  ]
  <% } %>
  grunt.initConfig
    jshint:
      options:
        reporter: require('jshint-stylish')<% if (enableBrowserSupport) { %>
      app:
        options:
          jshintrc:'<%= multiple ? "src/app/" : "" %>.jshintrc'
        files: [
          'src/<%= multiple ? "app/" : "" %>**/*.js'
        ] <% } if (enableServerSupport) { %>
      server:
        options:
          jshintrc: '<%= multiple ? "src/server/" : "" %>.jshintrc'
        files: [
          'src/<%= multiple ? "server/" : "" %>**/*.js'
        ]
      <% } %><% if (enableBrowserSupport) { %>
    browserify:
      dist:
        files: [
          'dist/<%= appname %>.js': 'src/<%= multiple ? "app" : "" %>/index.js'
        ]
    <% } %><% if (enableTests) { %>
    mochacli:
      spec:
        dist: 'test/test.coffee'
        options:
          compilers:[
            'coffee:coffee-script'
          ]
          reporter: 'spec'
    <% } %>
