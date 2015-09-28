describe('BooksListCntl tests', function () {
    'use strict';
    var $scope;

    beforeEach(module('app.main'));
    beforeEach(inject(function ($controller, $rootScope) {
        $scope = $rootScope.$new();
        $controller('BooksListCntl', {$scope: $scope});
    }));

    describe('scope initialization', function () {
        it('should init scope variables', function () {
            // given when then
            expect($scope.selectedBook.length).toBe(0);
        });
    });
    describe('table buttons', function () {
        it('should disabled edit and delete buttons, when no book was selected', function () {
            // given
            $scope.selectedBook = [];
            // when then
            expect($scope.isDisabled()).toBeTruthy();
        });
        it('should enable edit and delete buttons, when book was selected', function () {
            // given
            $scope.selectedBook = [{name: 'test'}];
            // when then
            expect($scope.isDisabled()).toBeFalsy();
        });
    });
});
