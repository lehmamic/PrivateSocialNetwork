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
        .pipe(debug({ title: 'vendor:' }))
        .pipe(filter(['*.eot', '*.svg', '*.ttf', '*.woff', '*.woff2']))
        .pipe(gulp.dest(paths.temp + 'assets/fonts'))   
        
   return merge(scripts, styles, fonts);
});

gulp.task('build-typescript', function () {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        //.pipe(debug({ title: 'typescript:' }))
        .pipe(changed(paths.output, {extension: '.js'}))
        .pipe(ts(tsProject));

    return tsResult.js
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.temp));
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