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
    describe('search', function () {
        it('should show result, when result found', function () {
            // given
            $scope.books = [{name: 'test'}];
            // when then
            expect($scope.resultsFound()).toBeTruthy();
        });
        it('should show not result, when result not found', function () {
            // given
            $scope.books = [];
            // when then
            expect($scope.resultsFound()).toBeFalsy();
        });
        it('should search for books by given searchParams', inject(function ($q, booksData) {
            // given
            var deferred = $q.defer(), response = [{
                id: 1,
                version: 0,
                title: 'book title',
                author: 'book author',
                year: 1999,
                genre: 'it'
            }];
            spyOn(booksData, 'getBooks').and.returnValue(deferred.promise);
            $scope.searchParameters = {title: 'book title', author: 'book author'};
            // when
            $scope.search();
            deferred.resolve({data: response});
            $scope.$digest();
            // then
            expect(booksData.getBooks).toHaveBeenCalledWith($scope.searchParameters);
            expect($scope.books.length).toBe(1);
            expect($scope.books).toEqual(response);
        }));
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
            $scope.selectedBook = [$scope.books[0]];
            spyOn($modal, 'open').and.returnValue({result: modalResultDeferred.promise});
            // when
            $scope.editBook();
            modalResultDeferred.resolve(editedBook);
            $scope.$digest();
            // then
            expect($modal.open).toHaveBeenCalledWith({
                animation: true,
                templateUrl: '/books-management/edit-book/edit-book.tpl.html',
                controller: 'EditBookCntl',
                size: 'modal-lg',
                resolve: {book: jasmine.any(Function)}
            });
            expect($modal.open.calls.mostRecent().args[0].resolve.book()).toEqual(editedBook);
            expect($scope.books[0]).toEqual(editedBook);
        }));
        it('should open add book modal dialog on add button clicked', inject(function ($q, $modal) {
            // given
            var modalResultDeferred = $q.defer(), addedBook = {
                id: 1,
                version: 0,
                genre: 'it',
                year: 1999,
                title: 'Code Complete',
                author: 'new author'
            };
            spyOn($modal, 'open').and.returnValue({result: modalResultDeferred.promise});
            spyOn($scope, 'search');
            // when
            $scope.addBook();
            modalResultDeferred.resolve(addedBook);
            $scope.$digest();
            // then
            expect($modal.open).toHaveBeenCalledWith({
                animation: true,
                templateUrl: '/books-management/add-book/add-book.tpl.html',
                controller: 'AddBookCntl',
                size: 'modal-lg'
            });
            expect($scope.search).toHaveBeenCalled();
        }));
        it('should delete book on delete button clicked', inject(function ($q, booksData, $modal) {
            // given
            var modalResultDeferred = $q.defer(), deleteBookDeferred = $q.defer(), deleteBook = {
                id: 1,
                version: 0,
                genre: 'it',
                year: 1999,
                title: 'Code Complete',
                author: 'edited author'
            };
            $scope.selectedBook = [deleteBook];
            spyOn($modal, 'open').and.returnValue({result: modalResultDeferred.promise});
            spyOn(booksData, 'deleteBook').and.returnValue(deleteBookDeferred.promise);
            spyOn($scope, 'search');
            // when
            $scope.deleteBook();
            modalResultDeferred.resolve();
            deleteBookDeferred.resolve();
            $scope.$digest();
            // then
            expect($modal.open).toHaveBeenCalledWith({
                animation: true,
                templateUrl: '/main/confirmation-dialog/confirmation.html',
                size: 'modal-sm'
            });
            expect(booksData.deleteBook).toHaveBeenCalledWith(deleteBook.id);
            expect($scope.search).toHaveBeenCalled();
        }));
    });
});
