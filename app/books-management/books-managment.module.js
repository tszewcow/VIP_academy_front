angular.module('app.books-management', ['ngRoute'])
    .config(function ($routeProvider) {
        'use strict';
        $routeProvider.when('/books-management/books-list', {templateUrl: '/books-management/books-list/books-list.tpl.html'});
    });
