'use strict';

var gulp = require('gulp');
var ts = require('gulp-typescript');
var debug = require('gulp-debug');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var uglify = require('gulp-uglify');

var typescript = require('typescript');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var config = require('../config');

var tsProject = ts.createProject('tsconfig.json', {
    typescript: typescript
});

gulp.task('build-typescript', function () {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        //.pipe(debug({ title: 'typescript:' }))
        //.pipe(changed(paths.output, {extension: '.css'}))
        .pipe(ts(tsProject));

    return tsResult.js
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./'));
});

gulp.task('build-sass', function () {
    return gulp.src(paths.sassSources)
        //.pipe(debug({ title: 'sass:' }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix(config.autoprefixerBrowsers))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./'));
});

gulp.task('minify-css', ['build'], function () {
    gulp.src(paths.cssFiles)
        .pipe(minifyCss())
        .pipe(gulp.dest('./'));
});

gulp.task('minify-html', ['build'], function() {
    gulp.src(paths.htmlFiles)
        .pipe(minifyHtml())
        .pipe(gulp.dest('./'));
});

gulp.task('uglify-js', ['build'], function() {
    gulp.src(paths.javaScriptFiles)
        // .pipe(debug({ title: 'uglify:' }))
        .pipe(uglify())
        .pipe(gulp.dest('./'));
});


// gulp.task('copy-release', ['clean-release'], function () {
//     gulp.src(paths.copyToOutput)
//         .pipe(gulp.dest(paths.output));    
// });

gulp.task('build', ['build-typescript', 'build-sass']);