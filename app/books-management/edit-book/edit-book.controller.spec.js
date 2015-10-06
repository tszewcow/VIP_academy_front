describe('EditBookCntl tests', function () {
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
        $controller('EditBookCntl', {$scope: $scope, book: bookMock, $modalInstance: $modalInstanceMock});
    }));

    describe('Modal window function', function () {
        it('should dismiss modal on cancel method call', function () {
            // given when
            $scope.cancel();
            // then
            expect($modalInstanceMock.dismiss).toHaveBeenCalledWith('cancel');
        });
        it('should return edited book on edit button clicked', inject(function (booksData, $q) {
            // given
            var editBookDeferred = $q.defer(),
                editedBook = {id: 1, title: 'new book'};
            $scope.book = bookMock;
            spyOn(booksData, 'updateBook').and.returnValue(editBookDeferred.promise);
            // when
            $scope.editBook();
            editBookDeferred.resolve(editedBook);
            $scope.$digest();
            // then
            expect(booksData.updateBook).toHaveBeenCalledWith(bookMock);
            expect($modalInstanceMock.close).toHaveBeenCalledWith(editedBook);
        }));
        it('should disable edit button when form is invalid', function () {
            // given
            $scope.editForm = {
                $invalid: true
            };
            // when then
            expect($scope.isFormInvalid()).toBeTruthy();
        });
        it('should enable edit button when form is valid', function () {
            // given
            $scope.editForm = {
                $invalid: false
            };
            // when then
            expect($scope.isFormInvalid()).toBeFalsy();
        });
    });
});