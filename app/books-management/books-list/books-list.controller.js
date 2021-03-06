angular.module('app.books-management').controller('BooksListCntl', function($modal, booksData) {
    'use strict';

    var cntl = this;

    cntl.searchParameters = {};

    cntl.books = [];

    cntl.search = function() {
        booksData.getBooks(cntl.searchParameters).then(function(response) {
            angular.copy(response.data, cntl.books);
            cntl.selectedRowIndex = undefined;
        });
    };

    cntl.resultsFound = function() {
        return cntl.books.length;
    };

    cntl.selectRow = function(index) {
        if (cntl.selectedRowIndex === index) {
            cntl.selectedRowIndex = undefined;
        } else {
            cntl.selectedRowIndex = index;
        }
    };

    cntl.isDisabled = function() {
        return angular.isUndefined(cntl.selectedRowIndex);
    };

    cntl.addBook = function() {
        $modal.open({
            animation: true,
            templateUrl: '/books-management/add-book/add-book.tpl.html',
            controller: 'AddBookCntl',
            controllerAs: 'cntl',
            size: 'modal-lg'
        }).result.then(function(result) {
            cntl.search();

            // alternative for stream 1
            // cntl.books.push(result);
        });
    };

    cntl.editBook = function() {
        $modal.open({
            animation: true,
            templateUrl: '/books-management/edit-book/edit-book.tpl.html',
            controller: 'EditBookCntl',
            controllerAs: 'cntl',
            size: 'modal-lg',
            resolve: {
                book: function() {
                    return cntl.books[cntl.selectedRowIndex];
                }
            }
        }).result.then(function(result) {
            cntl.books[cntl.selectedRowIndex] = result;
            cntl.selectedRowIndex = undefined;

            // alternative for stream 1
            // cntl.books[cntl.selectedRowIndex] = result;
            // cntl.selectedRowIndex = undefined;
        });
    };

    cntl.delete = function() {
        booksData.deleteBook(cntl.books[cntl.selectedRowIndex].id).then(function() {
            cntl.search();
            cntl.selectedRowIndex = undefined;
        });

        // alternative for stream 1
        // cntl.books.splice(cntl.selectedRowIndex, 1);
        // cntl.selectedRowIndex = undefined;
    };
});
