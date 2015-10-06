
var appRoot = 'client';
var outputRoot = 'wwwroot';

module.exports = {
    root: 'client',
    output: outputRoot,
	sassSources: [
        appRoot + '/**/*.scss',
        '!' + appRoot + '/assets/lib/**}',
        '!' + appRoot + '/assets/styles/common.scss',
        '!' + appRoot + '/assets/styles/bootstrap-theme.scss'],
	typeScriptSources: ['**/*.ts'],
    cssFiles: [appRoot + '/**/*.css'],
    javaScriptFiles: [
        appRoot + '/**/*.js',
        '!' + '**/assets/**/*.js',],
     htmlFiles: [
        appRoot + '/**/*.html',
        '!' + '**/assets/**/*.html',],
    angularFiles: [
        './node_modules/angular2/bundles/*.js'
    ],
    bootstrapFiles: [
        './node_modules/bootstrap-sass/assets/**/*.*'
    ],
	runtimeFiles: [
        './node_modules/traceur/bin/traceur-runtime.js',
        './node_modules/es6-module-loader/dist/es6-module-loader.js',
        './node_modules/systemjs/dist/system.src.js'
     ],
     cleanUpFiles: [outputRoot + '/'],
     copyToOutput: [appRoot + '/**/lib/**/*.*', appRoot + '/**/web.config']
};