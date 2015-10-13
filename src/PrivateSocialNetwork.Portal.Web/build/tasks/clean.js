var gulp = require('gulp');
var paths = require('../paths');
var ignore = require('gulp-ignore');
var del = require('del');
var vinylPaths = require('vinyl-paths');

// delete lib files
gulp.task('clean-lib-dev', function() {
    return gulp.src(paths.lib)
    //.pipe(ignore.exclude("web.config"))
    .pipe(vinylPaths(del));
});


// deletes all files in the output path
gulp.task('clean-release', function() {
  return gulp.src(paths.output)
    //.pipe(ignore.exclude("web.config"))
    .pipe(vinylPaths(del));
});