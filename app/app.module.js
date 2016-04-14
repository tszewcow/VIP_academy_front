angular.module('app', ['ngRoute',  'app.main', 'app.books-management'])
    .config(function ($locationProvider) {
        'use strict';
        $locationProvider.html5Mode(false);
    });
