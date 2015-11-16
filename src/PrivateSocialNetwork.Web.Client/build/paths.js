
var outputRoot = './dest/';
var sourceRoot = './src/';
var tempRoot = './.tmp/';

module.exports = {
    root: sourceRoot,
    output: outputRoot,
    temp: tempRoot,
    vendor: [
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/angular2/bundles/*.dev.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/*.min.js',
        'node_modules/bootstrap/dist/css/*.min.css',
        'node_modules/bootstrap/dist/fonts/*.eot',
        'node_modules/bootstrap/dist/fonts/*.svg',
        'node_modules/bootstrap/dist/fonts/*.ttf',
        'node_modules/bootstrap/dist/fonts/*.woff',
        'node_modules/bootstrap/dist/fonts/*.woff2'
    ],
	sassSources: [
        '**/*.scss',
        '!node_modules/**',
        '!assets/styles/common.scss',
        '!assets/styles/bootstrap-theme.scss'],
	typeScriptSources: ['**/*.ts'],
    cssFiles: [
        '**/*.css',
        '!node_modules/**'],
    javaScriptFiles: [
        '**/*.js',
        '!gulpfile.js',
        '!build/**',
        '!node_modules/**'],
     htmlFiles: [
        '**/*.html',
        '!index.html',
        '!node_modules/**'],
     copyToOutput: ['/**/lib/**/*.*','/**/web.config']
};