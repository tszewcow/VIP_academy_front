angular.module('app.books-management').controller('BooksListCntl', function($modal) {
    'use strict';

    var cntl = this;

    cntl.books = [{
        title: 'title 1',
        author: 'author 1',
        genre: 'IT',
        year: 2012
    }, {
        title: 'title 2',
        author: 'author 2',
        genre: 'Fantasy',
        year: 1987
    }];

    cntl.selectRow = function(index) {
        if (angular.isDefined(this.selectedRowIndex)) {
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
        });
    };
});
