'use strict';

var gulp = require('gulp');

gulp.task('prepare-release', ['build', 'minify-css', 'minify-html', 'uglify-js'])