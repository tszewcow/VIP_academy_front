angular.module('app.books-management').controller('AddBookCntl', function($modalInstance) {
    'use strict';

    var cntl = this;

    cntl.cancel = function() {
        $modalInstance.dismiss('cancel');
    };

    cntl.addBook = function() {
        $modalInstance.close();
    }
});
