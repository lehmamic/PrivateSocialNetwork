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

gulp.task('build-typescript', ['copy-lib-dev'], function () {
    var tsResult = tsProject.src()
        //.pipe(debug({ title: 'typescript:' }))
        .pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest('./'));
});

gulp.task('build-sass', ['copy-lib-dev'], function () {
    return gulp.src(paths.sassSources)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        // .pipe(debug({ title: 'sass:' }))
        .pipe(prefix(config.autoprefixerBrowsers))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('client/'));
});

gulp.task('copy-runtime-dev', ['clean-lib-dev'], function () {
    return gulp.src(paths.runtimeFiles)
     .pipe(gulp.dest('./client/assets/lib'));       
});

gulp.task('copy-angular2-dev', ['clean-lib-dev'], function () {
    return gulp.src(paths.angularFiles)
     .pipe(gulp.dest('./client/assets/lib/angular2'));       
});

gulp.task('copy-bootstrap-dev', ['clean-lib-dev'], function () {
    return gulp.src(paths.bootstrapFiles)
     .pipe(gulp.dest('./client/assets/lib/bootstrap-sass'));       
});

gulp.task('copy-jquery-dev', ['clean-lib-dev'], function () {
    return gulp.src(paths.jqueryFiles)
     .pipe(gulp.dest('./client/assets/lib/jquery'));       
});

gulp.task('copy-lib-dev', ['copy-runtime-dev', 'copy-angular2-dev', 'copy-bootstrap-dev', 'copy-jquery-dev']);

gulp.task('minify-css', ['build-dev'], function () {
    gulp.src(paths.cssFiles)
        .pipe(minifyCss())
        .pipe(rev())
        .pipe(gulp.dest(paths.output));
});

gulp.task('minify-html', ['build-dev'], function() {
    gulp.src(paths.htmlFiles)
        .pipe(minifyHtml())
        .pipe(gulp.dest(paths.output));
});

gulp.task('uglify-js', ['build-dev'], function() {
    gulp.src(paths.javaScriptFiles)
        //.pipe(ignore.exclude('**/assets/**/*.js'))
        // .pipe(debug({ title: 'uglify:' }))
        .pipe(uglify())
        .pipe(gulp.dest(paths.output));
});


gulp.task('copy-release', ['clean-release', 'copy-lib-dev'], function () {
    gulp.src(paths.copyToOutput)
        .pipe(gulp.dest(paths.output));    
});

gulp.task('build-dev', ['build-typescript', 'build-sass']);

gulp.task('build-release', ['clean-release', 'build-dev', 'minify-css', 'minify-html', 'uglify-js','copy-release'])