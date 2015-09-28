angular.module('app', ['ngRoute',  'app.main'])
    .config(function ($locationProvider) {
        'use strict';
        $locationProvider.html5Mode(false);
    });
