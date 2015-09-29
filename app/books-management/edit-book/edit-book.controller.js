angular.module('app.books-management')
    .controller('EditBookCntl', function ($scope, book, $modalInstance, booksData) {
        'use strict';

        $scope.book = angular.copy(book);

        $scope.editForm = {};

        $scope.editBook = function () {
            booksData.updateBook($scope.book).then(function (editedBook) {
                    $modalInstance.close(editedBook);
                }
            );
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.isFormInvalid = function () {
            return $scope.editForm.$invalid;
        };
    });
