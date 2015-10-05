'use strict';

var gulp = require('gulp');
var ts = require('gulp-typescript');
var debug = require('gulp-debug');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');

var typescript = require('typescript');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var config = require('../config');

var tsProject = ts.createProject('tsconfig.json', {
    typescript: typescript
});

gulp.task('build-typescript', function () {
    var tsResult = tsProject.src()
        //.pipe(debug({ title: 'typescript:' }))
        .pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest('./'));
});

gulp.task('build-sass', function () {
    return gulp.src(paths.sassSources)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        // .pipe(debug({ title: 'sass:' }))
        .pipe(prefix(config.autoprefixerBrowsers))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('client/'));
});

gulp.task('copy-lib', function () {
    gulp.src(paths.libFiles)
        .pipe(gulp.dest('./client/assets/lib'));
        
    gulp.src(paths.angularFiles)
     .pipe(gulp.dest('./client/assets/lib/angular2'));
     
    gulp.src(paths.bootstrapSassFiles)
        .pipe(gulp.dest('./client/assets/lib/bootstrap-sass'));     
});

gulp.task('build', ['build-typescript', 'build-sass', 'copy-lib']);