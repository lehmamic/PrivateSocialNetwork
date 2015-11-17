var gulp = require('gulp');
var browserSync = require('browser-sync');
var paths = require('../paths');

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve', ['watch'], function (done) {
    browserSync({
        online: false,
        open: false,
        port: 9000,
        server: {
            baseDir: [paths.temp],
            middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            }
        }
    }, done);
});