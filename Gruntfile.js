module.exports = function(grunt) {
    var webpack = require('webpack');
    var webpackConfig = require('./webpack.config.js');
    grunt.initConfig({
        webpack: {
            options: webpackConfig,
            build: {},
            'build-dev': {
                devtool: 'source-map'
            }
        },
        'webpack-dev-server': {
            options: {
                webpack: webpackConfig,
                publicPath: webpackConfig.output.publicPath
            },
            start: {
                webpack: {
                    devtool: 'eval'
                }
            }
        },
        watch: {
            app: {
                files: ['src/**/*', 'assets/scss/**/*.scss'],
                tasks: ['webpack:build-dev'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['webpack-dev-server:start']);
    grunt.registerTask('dev', ['webpack:build-dev', 'watch:app']);

    grunt.registerTask('build', ['webpack:build']);
};