angular.module('app', ['app.main', 'ui.bootstrap', 'app.books-management'])
    .config(function ($locationProvider) {
        'use strict';
        $locationProvider.html5Mode(false);
    });
