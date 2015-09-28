describe('BooksListCntl tests', function () {
    'use strict';
    var $scope;

    beforeEach(module('app'));

    beforeEach(inject(function ($controller, $rootScope, $modal) {
        $scope = $rootScope.$new();
        $controller('BooksListCntl', {$scope: $scope, $modal: $modal});
    }));

    describe('scope initialization', function () {
        it('should init scope variables', function () {
            // given when then
            expect($scope.selectedBook.length).toBe(0);
            expect($scope.visibleColumns.length).toBe(2);
            expect($scope.visibleColumns[0]).toEqual('title');
            expect($scope.visibleColumns[1]).toEqual('author');
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
        it('should open edit book modal dialog on edit button clicked', inject(function ($q, $modal) {
            // given
            var modalResultDeferred = $q.defer(), editedBook = {
                id: 1,
                version: 0,
                genre: 'it',
                year: 1999,
                title: 'Code Complete',
                author: 'edited author'
            };
            $scope.books = [{
                id: 1,
                version: 0,
                genre: 'it',
                year: 1999,
                title: 'Code Complete',
                author: 'Steve McConnell'
            }, {
                id: 3,
                version: 0,
                genre: 'it',
                year: 2013,
                title: 'Sztuka programowania',
                author: 'Donald Knuth'
            }];
            $scope.selectedBook = $scope.books[0];
            spyOn($modal, 'open').and.returnValue({result: modalResultDeferred.promise});
            // when
            $scope.editBook();
            modalResultDeferred.resolve(editedBook);
            $scope.$digest();
            // then
            expect($modal.open).toHaveBeenCalledWith({
                animation: true,
                templateUrl: '/edit-book/edit-book.tpl.html',
                controller: 'EditBookCntl',
                size: 'modal-lg',
                resolve: {book: jasmine.any(Function)}
            });
            expect($scope.books[0]).toEqual(editedBook);
        }));
    });
});
