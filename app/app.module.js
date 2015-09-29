angular.module('app', ['app.main', 'trNgGrid', 'ui.bootstrap', 'app.books-management', 'mwl.confirm'])
    .config(function ($locationProvider) {
        'use strict';
        $locationProvider.html5Mode(false);
    });
