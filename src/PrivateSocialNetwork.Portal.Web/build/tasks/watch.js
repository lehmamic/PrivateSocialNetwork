var gulp = require('gulp');
var args = require('../args.js');
var connect = require('gulp-connect');

gulp.task('watch', ['build'], function () {
    gulp.watch(args.typeScriptSources, ['build-typescript']).on('change', function (event) {
        console.log("watch");
        connect.Reload();
    });
    
    gulp.watch(args.SassSources, ['build-sass', 'lifereload']).on('change', function(event) {
        connect.Reload();
    });
});

gulp.task('serve', ['watch'], function() {
    connect.server({
        root: 'client',
        livereload: true,
        port: 9000
    });
});
