angular.module('app.books-management')
  .controller('AddBookCntl', function ($scope, $modalInstance) {
        'use strict';
        $scope.book = {};

        $scope.addForm = {};

        $scope.addBook = function () {
            $modalInstance.close($scope.book);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.isFormInvalid = function(){
            return $scope.addForm.$invalid;
        };

    });
