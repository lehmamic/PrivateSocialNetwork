'use strict';

var gulp = require('gulp');
var ts = require('gulp-typescript');
var debug = require('gulp-debug');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var rev = require('gulp-rev');
var uglify = require('gulp-uglify');
var ignore = require('gulp-ignore');

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
    gulp.src(paths.runtimeFiles)
        .pipe(gulp.dest('./client/assets/lib'));
        
    gulp.src(paths.angularFiles)
     .pipe(gulp.dest('./client/assets/lib/angular2'));
     
    gulp.src(paths.bootstrapFiles)
        .pipe(gulp.dest('./client/assets/lib/bootstrap-sass'));     
});

gulp.task('minify-css', function () {
    gulp.src(paths.cssFiles)
        .pipe(minifyCss())
        .pipe(rev())
        .pipe(gulp.dest(paths.output));
});

gulp.task('minify-html', function() {
    gulp.src(paths.htmlFiles)
        .pipe(minifyHtml())
        .pipe(gulp.dest(paths.output));
});

gulp.task('uglify-js', function() {
    gulp.src(paths.javaScriptFiles)
        //.pipe(ignore.exclude('**/assets/**/*.js'))
        .pipe(debug({ title: 'uglify:' }))
        .pipe(uglify())
        .pipe(gulp.dest(paths.output));
});

gulp.task('uglify-js', function() {
    gulp.src(paths.javaScriptFiles)
        //.pipe(ignore.exclude('**/assets/**/*.js'))
        .pipe(debug({ title: 'uglify:' }))
        .pipe(uglify())
        .pipe(gulp.dest(paths.output));
});

gulp.task('copy-release', function () {
    gulp.src(paths.copyToOutput)
        .pipe(gulp.dest(paths.output));    
});

gulp.task('build', ['build-typescript', 'build-sass', 'copy-lib']);

gulp.task('build-release', ['clean', 'build', 'minify-css', 'minify-html', 'uglify-js', 'copy-release'])