# generator-project 

[![Greenkeeper badge](https://badges.greenkeeper.io/ianwremmel/generator-project.svg)](https://greenkeeper.io/)

A generator for [Yeoman](http://yeoman.io).


## Getting Started

Make sure you've install Yeoman.

```
$ npm install -g yo
```

To install generator-project, fork this repository, clone your repository, and, in the new directory, run:

```
$ npm link
```

Finally, invoke the generator from your new project directory:

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

- Expand client build process
  - spritification
- Add live-reload to dev-mode server, grunt watch
- Add heroku support
  - if (multiple), create the server directory as a submodule

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/ianwremmel/generator-project/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

