'use strict';

var gulp = require('gulp');
var debug = require('gulp-debug');
var gulp_watch = require('gulp-watch');
var spawn = require('gulp-spawn');
var markdown = require('gulp-markdown');
var gutil = require('gulp-util');
var wrapper = require('gulp-wrapper');
var plumber = require('gulp-plumber');
var path = require('path');

var outputDir = './out'

var diagramsGlob = 'src/**/*.plantuml';
var markdownGlob = 'src/**/*.md';
var copyGlob = [
    'src/**',
    `!${diagramsGlob}`,
    `!${markdownGlob}`
  ];

var plantumlSpawnArgs = {
  cmd: 'java',
  args: [
    '-splash:no',
    '-Djava.awt.headless=true',
    '-DGRAPHVIZ_DOT="deps/graphviz-2.38/release/bin/dot.exe"',
    '-jar',
    'deps/plantuml.8039.jar',
    '-p',
    '-tsvg'
  ],
  filename: function(base, ext) {
    return base + ".svg";
  }
};

function html_header(data) {
  const filename = data.history[0];
  const title = path.basename(filename, path.extname(filename));
  return `<html>
    <head>
      <title>${title}</title>
      <link rel="stylesheet" href="foghorn.css">
    </head>
  </html>
  <body>`;
}

var html_footer = `</body>`;

function srcWithWatch(glob, options, watch) {
  var src = watch ? gulp_watch(glob, options) : gulp.src(glob, options);
  return src.pipe(debug());
}

function makeDiagrams(watch) {
  return srcWithWatch(diagramsGlob, { base: './src' }, watch)
    .pipe(plumber())
    .pipe(spawn(plantumlSpawnArgs))
    .pipe(gulp.dest(outputDir));
}

function makeMarkdown(watch) {
  return srcWithWatch(markdownGlob, { base: './src' }, watch)
    .pipe(markdown())
    .pipe(wrapper({
      header: html_header,
      footer: html_footer,
    }))
    .pipe(gulp.dest(outputDir));
}

function copyFiles(watch) {
  return srcWithWatch(copyGlob, { base: './src' }, watch)
    .pipe(gulp.dest(outputDir));
}

gulp.task('build:diagrams', function() { return makeDiagrams(false); });
gulp.task('build:markdown', function () { return makeMarkdown(false); });
gulp.task('build:static', function() { return copyFiles(false); });
gulp.task('watch:diagrams', function() { return makeDiagrams(true); });
gulp.task('watch:markdown', function() { return makeMarkdown(true); });
gulp.task('watch:static', function() { return copyFiles(true); });


gulp.task('build', ['build:diagrams', 'build:markdown', 'build:static']);
gulp.task('watch', ['watch:diagrams', 'watch:markdown', 'watch:static']);
