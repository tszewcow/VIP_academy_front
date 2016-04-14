angular.module('app.main', ['ngRoute', 'app.main.templates'])
    .config(function ($routeProvider) {
        'use strict';
        $routeProvider
            .when('/', {redirectTo: '/books-management/books-list'})
            .when('/books-management/books-list', {templateUrl: 'books-management/books-list/books-list.html'})
            .otherwise({templateUrl: 'main/page-not-found/page-not-found.html'});
    });
