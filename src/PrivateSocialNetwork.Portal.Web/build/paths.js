
var src = 'client';

module.exports = {
    root: 'client',
    dist: 'wwwroot',
	sassSources: [src + '/assets/styles/main.scss', src + '/Components/**/*.scss'],
	typeScriptSources: ['**/*.ts'],
	libFiles: [
        './node_modules/traceur/bin/traceur-runtime.js',
        './node_modules/es6-module-loader/dist/es6-module-loader.js',
        './node_modules/systemjs/dist/system.src.js',
        './node_modules/angular2/bundles/*.js']
};