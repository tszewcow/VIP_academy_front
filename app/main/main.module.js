angular.module('app.main', ['ngRoute', 'app.main.templates'])
    .config(function ($routeProvider) {
        'use strict';
        $routeProvider
            .when('/', {redirectTo: 'books-management/books-list'})
            .otherwise({templateUrl: 'main/page-not-found/page-not-found.html'});
    });
