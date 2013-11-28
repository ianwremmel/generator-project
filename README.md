# generator-project 

A generator for [Yeoman](http://yeoman.io).


## Getting Started

Make sure you've install Yeoman.

```
$ npm install -g yo
```

To install generator-project fork this repository, clone your repository, and, in the new directory, run:

```
$ npm link
```

Finally, initiate the generator:

```
$ yo project
```

### generator-project

generator-project is a yeoman generator built for ianwremmel's workflow preferences. At its core, it's a very lightweight set of preferences, but overtime will expand for many of the various project types he works on.

It is unlikely to ever end up in npm.

#### Assumptions

- If you're doing anything in the frontend, you'll be using browserify.
- Your name is `Ian W. Remmel` and all your projects will be `Copyright (c) Ian W. Remmel`.

#### TODO

- Add favicon support
  - dev mode server should point at a single file
  - prod mode server should point at a built file
  - grunt should build favicon
- Add library layout
  - library is a branching option: either it's a library or it has a client and/or server
- Expand client build process
  - browserify
  - minification
  - spritification
  - uglification
  - revving
  - point server at built files
  - point server at static assets
    - build process should place all static assets in `/dist`
- Add live-reload to dev-mode server, grunt watch
- Add grunt watch
- Add heroku support
  - if (multiple), create the server directory as a submodule

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
