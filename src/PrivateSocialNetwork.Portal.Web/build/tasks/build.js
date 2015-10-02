'use strict';

var gulp = require('gulp');
var ts = require('gulp-typescript');
var debug = require('gulp-debug');
var sass = require('gulp-sass');

var typescript = require('typescript');
var paths = require('../paths');

var tsProject = ts.createProject('tsconfig.json', {
    typescript: typescript
});

gulp.task('build-typescript', function () {
    var tsResult = tsProject.src()
        .pipe(debug({ title: 'typescript:' }))
        .pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest('./'));
});

gulp.task('build-sass', function () {
    return gulp.src(paths.sassSources)
        .pipe(debug({ title: 'sass:' }))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./client'));
});

gulp.task('copy-lib', function () {
    gulp.src(paths.libFiles)
        .pipe(debug({ title: 'lib:' }))
        .pipe(gulp.dest('./client/assets/lib'));
});

gulp.task('build', ['build-typescript', 'build-sass', 'copy-lib']);