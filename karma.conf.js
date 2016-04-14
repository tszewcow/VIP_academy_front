// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2014-06-09 using
// generator-karma 0.8.2

module.exports = function (config) {
    'use strict';
    //merge libraries configured by bower, application sources, and specs
    var libs = require('wiredep')({
        devDependencies: true
    }).js, _ = require('lodash'), pathsConf = require('./gulp/lib/config-factory.js')(require('./config.json'));

    var coverageConfig = {
        plugins: [
            'karma-phantomjs-launcher', 'karma-chrome-launcher', 'karma-jasmine'
        ],
        // coverage reporter generates the coverage
        reporters: [],

        preprocessors: {},

    };

    var karmaDefaultConfig = {
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // base path, that will be used to resolve files and exclude
        basePath: '.',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: _.flatten([libs, pathsConf.scripts.src(), pathsConf.scripts.testSrc()]),

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 7777,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: [
            'PhantomJS'
        ],

        // Which plugins to enable
        plugins: [
            'karma-phantomjs-launcher', 'karma-chrome-launcher', 'karma-jasmine'
        ],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // coverage reporter generates the coverage

        // optionally, configure the reporter
    };
    config.set(karmaDefaultConfig);
};
