'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:3000",
    files: ["public/**/*.*"],
    browser: "google chrome",
    port: 7000,
  });
});

gulp.task('nodemon', function (cb) {

  var started = false;

  return nodemon({
    script: 'index2.js'
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb();
      started = true;
    }
  });
});

// scss
gulp.task('sass', function () {
  return gulp.src('app/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
})

//watch
gulp.task('watch', function () {
  gulp.watch('app/sass/*.scss', ['sass']);
})

gulp.task('default', function () {
  gulp.run('browser-sync', 'sass', 'watch')
});