# Generated on <%= (new Date()).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
module.exports = (grunt) ->
  require('load-grunt-tasks')(grunt)

  # Public Tasks
  # ------------

  grunt.registerTask 'dev', [
    'dev-build'
  ]

  grunt.registerTask 'dev-server', [
    'dev-build'
    'concurrent:dev'
  ]

  <% if (enableTests) { %>
  grunt.registerTask 'test', [
    'test-build'
    'mochacli'
    'express:testing'
    'mocha'
  ]

  # Note: to ease maintainability, there is no watch task for `test-server`.
  # Moreover, you should really only use `test-server` to debug your tests, not
  # for active development, therefore, if you need to use `watch`, use
  # `dev-server`.
  grunt.registerTask 'test-server', [
    'test-build'
    'nodemon:testing'
  ]
  <% } %>

  grunt.registerTask 'prod', [
    'prod-build'
  ]

  grunt.registerTask 'prod-server', [
    'prod'
    # TODO nodemon is the wrong task for running a production server.
    'nodemon:prod'
  ]

  <% if (enableTests) { %>
  # TODO add `prod-test` to verify that built assets work properly.
  # Alternatively, integrate more build steps into `test`.
  <% } %>


  # Config
  # ------

  grunt.initConfig
    pkg:
      grunt.file.readJSON 'package.json'

    yeoman:
      server:     'src/server'

      src:        'src'
      appSrc:     'src/app'
      staticSrc:  'src/app/static'

      dist:       'dist'
      appDist:    'dist/app'
      staticDist: 'dist/app'

    clean:
      dist: [
        '<%= yeoman.dist %>'
      ]
      tmp: [
        '.tmp'
      ]

    jshint:
      options:
        reporter: require('jshint-stylish')
      app:
        options:
          jshintrc:'<%= yeoman.appSrc %>/.jshintrc'
        files:
          src: [
            '<%= yeoman.appSrc %>/**/*.js'
          ]
      server:
        options:
          jshintrc: '<%= yeoman.server %>/.jshintrc'
        files:
          src: [
            '<%= yeoman.server %>/**/*.js'
          ]

    preprocess:
      dev:
        src: '<%= yeoman.staticSrc %>/index.html'
        dest: '<%= yeoman.staticDist %>/index.html'
        options:
          context:
            NODE_ENV: 'development'
      <% if (enableTests) { %>
      testing:
        src: '<%= yeoman.staticSrc %>/index.html'
        dest: '<%= yeoman.staticDist %>/index.html'
        options:
          context:
            NODE_ENV: 'testing'
      <% } %>
      prod:
        src: '<%= yeoman.staticSrc %>/index.html'
        dest: '.tmp//index.html'
        options:
          context:
            NODE_ENV: 'production'

    copy:
      images:
        expand: true
        cwd: '.tmp'
        src: [
          'images/**/*'
          '!images/favicons/**'
        ]
        dest: '<%= yeoman.appDist %>'

    <% if (includeBootstrap) { %>
    customize_bootstrap:
      all:
        options:
          components: 'bower_components'
          src: '<%= yeoman.appSrc %>/styles/bootstrap'
          dest: '<%= yeoman.appSrc %>/styles'
          local: '<%= yeoman.appSrc %>/styles/local.less'
    <% } %>

    less:
      prod:
        files:
          '.tmp/styles/main.less.css': '<%= yeoman.appSrc %>/styles/main.less'

    autoprefixer:
      options:
        browsers: ['last 2 version']
      prod:
        src: '.tmp/styles/main.less.css'
        dest: '.tmp/styles/main.css'

    cssmin:
      prod:
        files:
          '<%= yeoman.appDist %>/styles/main.css': '.tmp/styles/main.css'

    browserify:
      prod:
        files:
          '.tmp/scripts/main.js': '<%= yeoman.appSrc %>/scripts/main.js'
        options:
          transform: [
            'debowerify'
          ]

    uglify:
      prod:
        files:
          '<%= yeoman.appDist %>/scripts/main.js': '.tmp/scripts/main.js'
        options:
          compress: true

    imagemin:
      prod:
        files: [
          expand: true
          cwd: '<%= yeoman.appSrc %>/images'
          src: ['**/*.{png,jpg,gif}']
          dest: '.tmp/images'
        ]

    favicons:
      options:
        html: '.tmp/index.html'
        trueColor: true
        HTMLPrefix: '/images/favicons/'
      prod:
        src: '.tmp/images/favicons/favicon.png'
        dest: '<%= yeoman.appDist %>/images/favicons'

    filerev:
      prod:
        src: [
          '<%= yeoman.appDist %>/*/**/*.*'
          '!<%= yeoman.appDist %>/images/favicons/**'
        ]

    filerev_apply:
      prod:
        options:
          prefix: '<%= yeoman.appDist %>'
        files: [
          expand: true
          cwd: '<%= yeoman.appDist %>'
          src: ['**/*.{html,js,css}']
          dest: '<%= yeoman.appDist %>'
        ]

    userev:
      prod:
        src: '<%= yeoman.appDist %>/index.html'

    htmlmin:
      prod:
        options:
          removeComments: true
          collapseWhitespace: true
        files: [
          expand: true
          cwd: '.tmp/'
          src: ['**/*.html']
          dest: '<%= yeoman.staticDist %>'
        ]

    nodemon:
      dev:
        options:
          env:
            NODE_ENV: 'development'
      <% if (enableTests) { %>
      testing:
        options:
          env:
            NODE_ENV: 'testing'
      <% } %>
      prod:
        options:
          env:
            NODE_ENV: 'production'

    <% if (enableTests) { %>
    mochacli:
      spec:
        dist: ['test/test.js']
        options:
          reporter: 'spec'

    express:
      testing:
        options:
          script: '<%= yeoman.server %>/server.js'
          node_env: 'testing'

    mocha:
      spec:
        options:
          run: true
          urls: ['http://localhost:3000']
          reporter: 'Spec'
    <% } %>

    watch:
      static:
        files: ['<%= yeoman.staticSrc %>/**/*.html']
        tasks: ['prepocess:dev']

    concurrent:
      dev: [
        'watch:static'
        'nodemon:dev'
      ]
      build: [
        'build-styles'
        'build-scripts'
        'build-images'
      ]


  # Task Components
  # ---------------
  # Don't use these tasks from the command line, they're building blocks for the
  # public tasks above.
  grunt.registerTask 'before-build', [
    'clean'
    'jshint'
  ]

  grunt.registerTask 'after-build', [
    'clean:tmp'
  ]

  grunt.registerTask 'dev-build', [
    'before-build'
    'preprocess:dev'
    <% if (includeBootstrap) { %>
    'customize_bootstrap'
    <% } %>
    'after-build'
  ]

  <% if (enableTests) { %>
  grunt.registerTask 'test-build', [
    'before-build'
    'preprocess:testing'
    'after-build'
  ]
  <% } %>

  grunt.registerTask 'prod-build', [
    'before-build'
    'preprocess:prod'
    'concurrent:build'
    'htmlmin'
    'filerev'
    'filerev_apply'
    'after-build'
  ]

  grunt.registerTask 'build-styles', [
    'less'
    'autoprefixer'
    'cssmin'
  ]

  grunt.registerTask 'build-scripts', [
    'browserify'
    'uglify'
  ]

  grunt.registerTask 'build-images', [
    'imagemin'
    'favicons'
    'copy:images'
    # TODO oversprite (might break `concurrent` config)
  ]
