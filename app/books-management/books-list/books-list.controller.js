angular.module('app.books-management')
    .controller('BooksListCntl', function ($scope, $modal, booksData) {
        'use strict';

        $scope.books = [];
        $scope.selectedBook = [];
        $scope.visibleColumns = ['title', 'author'];
        $scope.searchParameters = {};

        $scope.isDisabled = function () {
            return !$scope.selectedBook.length;
        };

        $scope.resultsFound = function () {
            return $scope.books.length;
        };

        $scope.search = function () {
            booksData.getBooks($scope.searchParameters).then(function (response) {
                angular.copy(response.data, $scope.books);
            });
        };

        $scope.editBook = function () {
            $modal.open({
                animation: true,
                templateUrl: '/books-management/edit-book/edit-book.tpl.html',
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

        $scope.addBook = function () {
            $modal.open({
                animation: true,
                templateUrl: '/books-management/add-book/add-book.tpl.html',
                controller: 'AddBookCntl',
                size: 'modal-lg'
            }).result.then(function () {
                    $scope.search();
                });
        };

        $scope.deleteBook = function () {
            booksData.deleteBook($scope.selectedBook[0].id).then(function () {
                    $scope.search();
                }
            );
        };

    });
