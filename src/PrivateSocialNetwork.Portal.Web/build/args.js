module.export = {
	sassSources: ['client/**/*.scss'],
	typeScriptSources: ['client/**/*.ts', 'typings/**/*.ts'],
	libFiles: [
        './node_modules/traceur/bin/traceur-runtime.js',
        './node_modules/es6-module-loader/dist/es6-module-loader.js',
        './node_modules/systemjs/dist/system.src.js',
        './node_modules/angular2/bundles/*.js']
};