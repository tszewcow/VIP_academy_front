angular.module('app.books-management')
    .controller('AddBookCntl', function ($scope, $modalInstance) {
        'use strict';
        $scope.book = {};

        $scope.addForm = {};

        $scope.addBook = function () {
            //booksData.saveBook($scope.book).then(function (addedBook) {
            //        $modalInstance.close(addedBook);
            //    }
            //);
            $modalInstance.close($scope.book);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.isFormInvalid = function () {
            return $scope.addForm.$invalid;
        };

    });
