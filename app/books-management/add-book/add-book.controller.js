angular.module('app.books-management')
    .controller('AddBookCntl', function ($scope, $modalInstance, booksData) {
        'use strict';
        $scope.book = {};

        $scope.addForm = {};

        $scope.addBook = function () {
            booksData.saveBook($scope.book).then(function (addedBook) {
                    $modalInstance.close(addedBook);
                }
            );
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.isFormInvalid = function () {
            return $scope.addForm.$invalid;
        };

    });
