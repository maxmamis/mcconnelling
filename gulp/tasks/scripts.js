'use strict';

var config          = require('../config'),
    babelify        = require('babelify'),
    bs              = require('browser-sync').get('bs1'),
    browserify      = require('browserify'),
    source          = require('vinyl-source-stream'),
    buffer          = require('vinyl-buffer'),
    gulp            = require('gulp'),
    gutil           = require('gulp-util'),
    gulpif          = require('gulp-if'),
    concat          = require('gulp-concat'),
    jshint          = require('gulp-jshint'),
    stylish         = require('jshint-stylish'),
    sourcemaps      = require('gulp-sourcemaps'),
    rename          = require('gulp-rename'),
    uglify          = require('gulp-uglify');


gulp.task('scripts', function() {
    browserifyProcess(config.appJs)
});

gulp.task('hint', function() {
    return gulp.src(config.appJs)
        .pipe(jshint(config.jshint))
        .on('error', gutil.log)
        .pipe(jshint.reporter('jshint-stylish'))
});

function browserifyProcess(jsFile) {
    var jsFileMin = jsFile.split('/')[jsFile.split('/').length-1].split('.');
    jsFileMin = jsFileMin[0] + '.min.' + jsFileMin[1];

    var bundler = browserify({ entries: jsFile, debug: true })
        .transform("babelify", {presets: ["es2015"]});

    bundler.bundle()
        .on('error', function (err) { console.error(err); })
        .pipe(source(jsFileMin))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify()) // Use any gulp plugins you want now
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.assets));

    bs.reload;
};
