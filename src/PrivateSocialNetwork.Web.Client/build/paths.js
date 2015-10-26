
var outputRoot = '../PrivateSocialNetwork.Portal.Web/wwwroot';

module.exports = {
    root: './',
    output: outputRoot,
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