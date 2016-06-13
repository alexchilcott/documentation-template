'use strict';

var gulp = require('gulp');
var debug = require('gulp-debug');
var watch = require('gulp-watch');
var spawn = require('gulp-spawn');
var exec = require('gulp-exec');
var markdown = require('gulp-markdown');
var childProcessExec = require('child_process').exec;
var runSequence = require('run-sequence');

var outputDir = './out'

var diagramsGlob = 'src/**/*.plantuml';
var markdownGlob = 'src/**/*.md';

var plantumlSpawnArgs = {
  cmd: 'java',
  args: [
    '-jar',
    'deps/plantuml.8039.jar',
    '-p',
    '-tsvg'
  ],
  filename: function(base, ext) {
    return base + ".svg";
  }
};



gulp.task('build:diagrams', function() {
  return gulp.src(diagramsGlob, { base: './src' })
    .pipe(debug())
    .pipe(spawn(plantumlSpawnArgs))
    .pipe(gulp.dest(outputDir));
});

gulp.task('build:markdown', function () {
    return gulp.src(markdownGlob, { base: './src' })
        .pipe(markdown())
        .pipe(gulp.dest(outputDir));
});

gulp.task('watch:diagrams', function() {
  return watch(diagramsGlob, { base: './src' })
    .pipe(debug())
    .pipe(spawn(plantumlSpawnArgs))
    .pipe(gulp.dest(outputDir));
});

gulp.task('watch:markdown', function() {
  return watch(markdownGlob, { base: './src' })
    .pipe(debug())
    .pipe(markdown())
    .pipe(gulp.dest(outputDir));
});

gulp.task('build', ['build:diagrams', 'build:markdown']);
gulp.task('watch', function(cb) {
  runSequence('build',
              ['watch:diagrams', 'watch:markdown'],
              cb);
});
