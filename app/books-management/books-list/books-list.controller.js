angular.module('app.books-management')
    .controller('BooksListCntl', function ($scope, $modal) {
        'use strict';

        $scope.books = [{id: 1, version: 0, genre: 'it', year: 1999, title: 'Code Complete', author: 'Steve McConnell'},
            {
                id: 2,
                version: 0,
                genre: 'it',
                year: 2001,
                title: 'Python. Wprowadzenie',
                author: 'Mark Lutz, David Ascher'
            },
            {id: 3, version: 0, genre: 'it', year: 2013, title: 'Sztuka programowania', author: 'Donald Knuth'},
            {
                id: 4,
                version: 0,
                genre: 'it',
                year: 2003,
                title: 'Pragmatyczny programista',
                author: 'Andy Hunt, Dave Thomas'
            },
            {
                id: 5,
                version: 0,
                genre: 'it',
                year: 2001,
                title: 'Wzorce projektowe',
                author: 'Erich Gamma, Ralph Johnson, Richard Helm, John Vlissides'
            }];

        $scope.selectedBook = [];
        $scope.visibleColumns = ['title', 'author'];

        $scope.isDisabled = function () {
            return !$scope.selectedBook.length;
        };

        $scope.editBook = function () {
            $modal.open({
                animation: true,
                templateUrl: '/edit-book/edit-book.tpl.html',
                controller: 'EditBookCntl',
                size: 'modal-lg',
                resolve: {
                    book: function () {
                        return $scope.selectedBook[0];
                    }
                }
            }).result.then(function (editedBook) {
                    var book = _.findWhere($scope.books, {id: editedBook.id});
                    angular.copy(editedBook, book);
                });
        };

    });
