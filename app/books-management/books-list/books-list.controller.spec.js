describe('BooksListCntl tests', function() {
    'use strict';
    var cntl;

    beforeEach(module('app'));

    beforeEach(inject(function($controller, $modal) {
        cntl = $controller('BooksListCntl', {
            $modal: $modal
        });
    }));

    describe('model initialization', function() {
        it('should init model variables', function() {
            // given when then
            expect(cntl.books).toBeDefined();
            expect(cntl.books.length).toBe(0);
            expect(cntl.searchParameters).toBeDefined();
        });

    });

    describe('search', function() {
        it('should show result, when result found', function() {
            // given
            cntl.books = [{
                name: 'test'
            }];
            // when then
            expect(cntl.resultsFound()).toBeTruthy();
        });
        it('should show not result, when result not found', function() {
            // given
            cntl.books = [];
            // when then
            expect(cntl.resultsFound()).toBeFalsy();
        });
        it('should search for books by given searchParams', inject(function($q, booksData, $rootScope) {
            // given
            var deferred = $q.defer(),
                response = [{
                    id: 1,
                    version: 0,
                    title: 'book title',
                    author: 'book author',
                    year: 1999,
                    genre: 'it'
                }];
            spyOn(booksData, 'getBooks').and.returnValue(deferred.promise);
            cntl.searchParameters = {
                title: 'book title',
                author: 'book author'
            };
            // when
            cntl.search();
            deferred.resolve({
                data: response
            });
            $rootScope.$digest();
            // then
            expect(booksData.getBooks).toHaveBeenCalledWith(cntl.searchParameters);
            expect(cntl.books.length).toBe(1);
            expect(cntl.books).toEqual(response);
        }));
    });

    describe('table actions', function() {
        it('should select a row in the table', function() {
            // given
            var selectedRowIndex = 3;
            // when
            cntl.selectRow(selectedRowIndex);
            // then
            expect(cntl.selectedRowIndex).toBe(selectedRowIndex);
        });
        it('should disable edit and delete buttons, when no book is selected', function() {
            // given
            cntl.selectedRowIndex = undefined;
            // when then
            expect(cntl.isDisabled()).toBeTruthy();
        });
        it('should enable edit and delete buttons, when book was selected', function() {
            // given
            cntl.selectedRowIndex = 3;
            // when then
            expect(cntl.isDisabled()).toBeFalsy();
        });
        it('should open edit book modal dialog on edit button clicked', inject(function($q, $modal, $rootScope) {
            // given
            var modalResultDeferred = $q.defer(),
                editedBook = {
                    id: 1,
                    version: 0,
                    genre: 'it',
                    year: 1999,
                    title: 'Code Complete',
                    author: 'edited author'
                };
            cntl.books = [{
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
            cntl.selectedRowIndex = 0;
            spyOn($modal, 'open').and.returnValue({
                result: modalResultDeferred.promise
            });
            // when
            cntl.editBook();
            modalResultDeferred.resolve(editedBook);
            $rootScope.$digest();
            // then
            expect($modal.open).toHaveBeenCalledWith({
                animation: true,
                templateUrl: '/books-management/edit-book/edit-book.tpl.html',
                controller: 'EditBookCntl',
                controllerAs: 'cntl',
                size: 'modal-lg',
                resolve: {
                    book: jasmine.any(Function)
                }
            });
            expect(cntl.books[0]).toEqual(editedBook);
        }));
        it('should open add book modal dialog on add button clicked', inject(function($q, $modal, $rootScope) {
            // given
            var modalResultDeferred = $q.defer(),
                addedBook = {
                    id: 1,
                    version: 0,
                    genre: 'it',
                    year: 1999,
                    title: 'Code Complete',
                    author: 'new author'
                };
            spyOn($modal, 'open').and.returnValue({
                result: modalResultDeferred.promise
            });
            spyOn(cntl, 'search');
            // when
            cntl.addBook();
            modalResultDeferred.resolve(addedBook);
            $rootScope.$digest();
            // then
            expect($modal.open).toHaveBeenCalledWith({
                animation: true,
                templateUrl: '/books-management/add-book/add-book.tpl.html',
                controller: 'AddBookCntl',
                controllerAs: 'cntl',
                size: 'modal-lg'
            });
            expect(cntl.search).toHaveBeenCalled();
        }));
        it('should delete book on delete button clicked', inject(function($q, booksData, $rootScope) {
            // given
            var deleteBookDeferred = $q.defer();
            cntl.books = [{
                id: 1,
                version: 0,
                genre: 'it',
                year: 1999,
                title: 'Code Complete',
                author: 'edited author'
            }];
            cntl.selectedRowIndex = 0;
            spyOn(booksData, 'deleteBook').and.returnValue(deleteBookDeferred.promise);
            spyOn(cntl, 'search');
            // when
            cntl.delete();
            deleteBookDeferred.resolve();
            $rootScope.$digest();
            // then
            expect(booksData.deleteBook).toHaveBeenCalledWith(cntl.books[0].id);
            expect(cntl.search).toHaveBeenCalled();
        }));
    });
});
