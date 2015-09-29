describe('AddBookCntl tests', function () {
    'use strict';

    var $scope, bookMock = {
        id: 1,
        version: 0,
        genre: 'it',
        year: 1999,
        title: 'Code Complete',
        author: 'Steve McConnell'
    }, $modalInstanceMock = {
        close: jasmine.createSpy('close mock'),
        dismiss: jasmine.createSpy('dismiss mock')
    };
    beforeEach(module('app.books-management'));
    beforeEach(inject(function ($controller, $rootScope) {
        $scope = $rootScope.$new();
        $controller('AddBookCntl', {$scope: $scope, book: bookMock, $modalInstance: $modalInstanceMock});
    }));

    describe('Modal window function', function () {
        it('should dismiss modal on cancel method call', function () {
            // given when
            $scope.cancel();
            // then
            expect($modalInstanceMock.dismiss).toHaveBeenCalledWith('cancel');
        });
        it('should return added book on add button clicked', function () {
            // given
            $scope.book = bookMock;
            // when
            $scope.addBook();
            // then
            expect($modalInstanceMock.close).toHaveBeenCalledWith(bookMock);
        });
        it('should disable add button when form is invalid', function () {
            // given
            $scope.addForm = {
                $invalid: true
            };
            // when then
            expect($scope.isFormInvalid()).toBeTruthy();
        });
        it('should enable add button when form is valid', function () {
            // given
            $scope.addForm = {
                $invalid: false
            };
            // when then
            expect($scope.isFormInvalid()).toBeFalsy();
        });
    });
});