'use strict';

var config          = require('../config'),
    bs              = require('browser-sync').get('bs1'),
    gulp            = require('gulp'),
    gutil           = require('gulp-util'),
    gulpif          = require('gulp-if'),
    sass            = require('gulp-sass'),
    sourcemaps      = require('gulp-sourcemaps'),
    autoprefixer    = require('gulp-autoprefixer'),
    minifyCSS       = require('gulp-minify-css'),
    rename          = require('gulp-rename');


gulp.task('styles', function() {
    cssProcess(config.appScss);
});

function cssProcess(scssFile) {
    var cssMin = scssFile.split('/')[scssFile.split('/').length-1].split('.');
    cssMin = cssMin[0] + '.min.' + cssMin[1].replace('scss', 'css');
    var externalCSS = function() {
        return scssFile.indexOf('external.scss');
    };
    return gulp.src(scssFile)
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: false,
            onError: function(err) {
                console.log(err);
            }
        }))
        .on('error', gutil.log)
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie >= 8'],
            cascade: false
        }))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write())
        .pipe(rename(cssMin))
        .pipe(gulp.dest(config.assets))
        .pipe(bs.stream({match: '**/*.css'}));
        bs.reload;
};
