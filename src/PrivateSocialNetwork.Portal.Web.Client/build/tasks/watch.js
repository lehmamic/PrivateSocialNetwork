var gulp = require('gulp');
var paths = require('../paths');
var browserSync = require('browser-sync');

// outputs changes to files to the console
function reportChange(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('watch', ['build'], function () {

    gulp.watch(paths.typeScriptSources, ['build-typescript', browserSync.reload]).on('change', reportChange);
    gulp.watch(paths.SassSources, ['build-sass', browserSync.reload]).on('change', reportChange);

});