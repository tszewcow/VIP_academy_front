angular.module('app.books-management').controller('BooksListCntl', function($scope) {
    'use strict';

    var cntl = this;

    this.books = [{
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

    this.selectRow = function(index) {
        if (angular.isDefined(this.selectedRowIndex)) {
            this.selectedRowIndex = undefined;
        } else {
            this.selectedRowIndex = index;
        }
    };

    this.isDisabled = function() {
        return angular.isUndefined(this.selectedRowIndex);
    };
});
