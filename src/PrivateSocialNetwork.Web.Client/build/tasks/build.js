'use strict';

var gulp = require('gulp');
var ts = require('gulp-typescript');
var debug = require('gulp-debug');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var uglify = require('gulp-uglify');
var changed = require('gulp-changed');
var filter = require('gulp-filter');
var sourcemaps = require('gulp-sourcemaps');
var usemin = require('gulp-usemin');

var typescript = require('typescript');
var merge = require('merge-stream');
var paths = require('../paths');
var config = require('../config');

var tsProject = ts.createProject(paths.root + 'tsconfig.json', {
    typescript: typescript
});

gulp.task('copy-vendor', function() {
   var scripts = gulp.src(paths.vendor)
        //.pipe(debug({ title: 'vendor:' }))
        .pipe(filter('*.js'))
        .pipe(gulp.dest(paths.temp + 'assets/scripts')) 
   
   var styles = gulp.src(paths.vendor)
        .pipe(filter('*.css'))
        .pipe(gulp.dest(paths.temp + 'assets/styles'))
        
   var fonts = gulp.src(paths.vendor)
        //.pipe(debug({ title: 'vendor:' }))
        .pipe(filter(['*.eot', '*.svg', '*.ttf', '*.woff', '*.woff2']))
        .pipe(gulp.dest(paths.temp + 'assets/fonts'))   
        
   return merge(scripts, styles, fonts);
});

gulp.task('copy-html', function() {
   return gulp.src(paths.root + '**/*.html')
   .pipe(changed(paths.temp, {extension: '.html'}))
        .pipe(gulp.dest(paths.temp)); 
});

gulp.task('build-typescript', function () {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        //.pipe(debug({ title: 'typescript:' }))
        .pipe(changed(paths.temp, {extension: '.js'}))
        .pipe(ts(tsProject));

    return tsResult.js
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.temp));
});

gulp.task('build-sass', function () {
    return gulp.src(paths.root + '**/*.scss')
        //.pipe(debug({ title: 'sass:' }))
        .pipe(sourcemaps.init())
        .pipe(changed(paths.temp, {extension: '.css'}))
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix(config.autoprefixerBrowsers))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.temp));
});

gulp.task('minify-css', ['build-dev', 'clean-dist'], function () {
    return gulp.src([paths.temp + '**/*.css', '!' + paths.temp + 'assets/**/*.css'])
        .pipe(minifyCss())
        .pipe(gulp.dest(paths.output));
});

gulp.task('minify-html', ['build-dev', 'clean-dist'], function() {
    return gulp.src([paths.temp + '**/*.html', '!' + paths.temp + 'index.html', '!' + paths.temp + 'assets/**/*.html'])
        .pipe(minifyHtml())
        .pipe(gulp.dest(paths.output));
});

gulp.task('uglify-js', ['build-dev', 'clean-dist'], function() {
    return gulp.src([paths.temp + '**/*.js', '!' + paths.temp + 'assets/**/*.js'])
        //.pipe(debug({ title: 'uglify:' }))
        .pipe(uglify())
        .pipe(gulp.dest(paths.output));
});

gulp.task('copy-dist', ['build-dev', 'clean-dist'], function() {
    return gulp.src(paths.temp + '**/*.{eot,svg,ttf,woff,woff2}')
        //.pipe(debug({ title: 'copy-dist:' }))
        .pipe(gulp.dest(paths.output));
});

gulp.task('usemin', ['build-dev', 'clean-dist'], function() {
  return gulp.src(paths.temp + '*.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat'],//rev() ],
      html: [minifyHtml({ empty: true })],
      vendorjs: [ uglify(), 'concat'],//, rev() ],
      vendorcss: [ minifyCss(), 'concat' ]
    }))
    .pipe(gulp.dest(paths.output));
});

gulp.task('build-dev', ['copy-vendor', 'copy-html', 'build-typescript', 'build-sass']);

gulp.task('build-dist', ['usemin', 'copy-dist', 'uglify-js', 'minify-html', 'minify-css']);