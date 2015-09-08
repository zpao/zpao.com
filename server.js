var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var sass = require('metalsmith-sass');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');

// TODO: put watch and serve behind flags so we can generate easily

new Metalsmith(__dirname)
  .source('src')
  .destination('build')
  .ignore([
    '**/.DS_Store'
  ])
  .use(loggit())
  .use(markdown())
  .use(permalinks({
    pattern: 'posts/:title'
  }))
  .use(sass({
    outputStyle: 'expanded'
  }))
  .use(serve({
    verbose: true
  }))
  .use(watch())
  .build(function(err) {
    if (err) throw err;
  });


function loggit(options) {
  return function(files, metalsmith, done) {
    Object.keys(files).forEach(function(file) {
      console.log(file);
    })
    done();
  }
}
