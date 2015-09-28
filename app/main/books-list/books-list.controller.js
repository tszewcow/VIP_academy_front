angular.module('app.main')
    .controller('BooksListCntl', function ($scope, $modal) {
        'use strict';

        $scope.books = [{name: 'Moroni', age: 50},
            {name: 'Tiancum', age: 43},
            {name: 'Jacob', age: 27},
            {name: 'Nephi', age: 29},
            {name: 'Enos', age: 99}];
        $scope.selectedBook = [];

        $scope.isDisabled = function () {
            return !$scope.selectedBook.length;
        };

    });
