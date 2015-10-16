
var outputRoot = 'wwwroot';

module.exports = {
    root: '/',
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
        '!node_modules/**'],
     htmlFiles: [
        '/**/*.html',
        '!node_modules/**'],
     copyToOutput: ['/**/lib/**/*.*','/**/web.config']
};