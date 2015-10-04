
var src = 'client';

module.exports = {
    root: 'client',
    dist: 'wwwroot',
	sassSources: [src + '/**/*.scss', '!' + src + '/assets/lib/**}'],
	typeScriptSources: ['**/*.ts'],
    angularFiles: [
        './node_modules/angular2/bundles/*.js'
    ],
    bootstrapSassFiles: [
        './node_modules/bootstrap-sass/assets/**/*.*'
    ],
	libFiles: [
        './node_modules/traceur/bin/traceur-runtime.js',
        './node_modules/es6-module-loader/dist/es6-module-loader.js',
        './node_modules/systemjs/dist/system.src.js'
        ]
};