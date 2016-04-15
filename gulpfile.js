var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

// static server
gulp.task('server', function () {
  var files = [
    './views/*.html',
    'dist/**/*.css',
    'dist/**/*.js'
  ];

  browserSync.init(files, {
    server: {
      baseDir: './'
    }
  })
})

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
  gulp.run('server', 'sass', 'watch')
})
