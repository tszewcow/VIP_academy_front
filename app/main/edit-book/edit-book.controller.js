angular.module('app.main')
    .controller('EditBookCntl', function ($scope, book, $modalInstance) {
        'use strict';

        $scope.book = angular.copy(book);

        $scope.editForm = {};

        $scope.editBook = function () {
            $modalInstance.close($scope.book);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.isFormInvalid = function(){
            return $scope.editForm.$invalid;
        };
    });
