var c = require('../gulpfile.config');
var config = new c();
var gulp = require('gulp');
var utils = require('gulp-utils');
var path = require('path');

gulp.task('copy:bundle', function() {
    return gulp.src([path.join(config.directories.dist, config.fileNames.jsBundleOut)].concat(config.dependencies.examples)).pipe(gulp.dest(config.directories.examplesJs));
});

gulp.task('copy:typings', function() {
    return gulp.src(config.directories.typings).pipe(gulp.dest(config.directories.typings));
});