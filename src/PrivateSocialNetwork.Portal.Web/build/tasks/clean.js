var gulp = require('gulp');
var paths = require('../paths');
var ignore = require('gulp-ignore');
var del = require('del');
var vinylPaths = require('vinyl-paths');

// deletes all files in the output path
gulp.task('clean', function() {
  return gulp.src(paths.cleanUpFiles)
    //.pipe(ignore.exclude("web.config"))
    .pipe(vinylPaths(del));
});