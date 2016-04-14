angular.module('app.books-management').controller('BooksListCntl', function($scope) {
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
        if (cntl.selectedRowIndex === index) {
            cntl.selectedRowIndex = undefined;
        } else {
            cntl.selectedRowIndex = index;
        }
    };

    cntl.isDisabled = function() {
        return angular.isUndefined(cntl.selectedRowIndex);
    };
});
