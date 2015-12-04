var config          = require('../config'),
    gulp            = require('gulp'),
    imagemin        = require('gulp-imagemin'),
    pngquant        = require('imagemin-pngquant');


gulp.task('imgmin', function() {
    return gulp.src(config.images.src)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(config.images.dest));
});
