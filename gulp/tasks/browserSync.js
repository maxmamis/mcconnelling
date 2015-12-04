'use strict';

var config          = require('../config'),
    gulp            = require('gulp'),
    bs              = require('browser-sync').create('bs1');

// Watch files with BrowserSync server
gulp.task('serve', ['templates', 'scripts', 'styles', 'bs'], function() {
   gulp.watch(config.styles, ['styles'], bs.reload);
   gulp.watch(config.scripts, ['scripts']);
   gulp.watch(config.templates.src, ['templates'], bs.reload);
});

// BrowserSync server
gulp.task('bs', function() {
  bs.init({
      port: 8889,
      //https: true,
      server: {
          baseDir: config.root
      },
      open: false
  });
});

gulp.task('templates', function() {
  return gulp.src(config.templates.src)
    .pipe(gulp.dest(config.templates.dest));
});
