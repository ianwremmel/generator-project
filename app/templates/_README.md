# <%= appname %>

## Getting Started

1. Install global dependencies

  You'll need [NodeJS](http://nodejs.org), ImageMagick, [Bower](http://bower.io), and [Grunt](http://gruntjs.com);

  ```bash
  brew install node ImageMagick
  npm install -g bower grunt-cli
  ```

2. Install local dependencies

  All other dependencies are defined in `package.json` and `bower.json`.

  ```bash
  npm install
  bower install
  ```

## Running the tests

The test suite can be run from the command line or in-browser (note: in-browser tests execute `test/spec` but not `test/unit`). Generally, you'll want to run from the command line, but for debugging tests, it may be advantageous to run them in-browser

Execute ```npm test``` or ```grunt test``` to run the tests from the command line.

Execute ```grunt test-server``` to start the test server, then visit `http://localhost:3000` to view the tests in-browser.

## Deploying

Build the project using `grunt prod`.

Note: the `grunt prod-server` task is for local development only; it builds the same assets used in production and starts a server, but your devops team or server environment should dictate how you decide run the server.

<% if (enableServerSupport) { %>
`npm start` simply invokes `node src/server/server.js`. While this will run the server, it's not very fault tolerant; if the server crashes, it will not attempt to recover. Consider using [forever](https://github.com/nodejitsu/forever) for automatic restarts or work with your devops team or system admin to find an appropriate server solution.

### Notes
<% } else { %>
As the project is statically compiled, simply point your webserver root at `dist/app`.

### Notes
1. In order for bookmarked URLs to work properly, your webserver must deliver `index.html` for any possible app route.

2. In order to avoid 404s when browsers check the default location of the favicon, your server should to requests for requests for all files in `dist/app/images/favicons` as if they were in the webserver root (e.g. respond to `GET /favicon.ico` with `dist/app/images/favicons/favicon.ico`).
<% } %>
1. Asset URLs are relative to `/` in order to make `pushState` easier to manage and therefore, `dist/app` must be the root of your domain or sub-domain.
