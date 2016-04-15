angular.module('app.books-management').controller('AddBookCntl', function($modalInstance, booksData) {
    'use strict';

    var cntl = this;

    cntl.book = {};

    cntl.addForm = {};

    cntl.cancel = function() {
        $modalInstance.dismiss('cancel');
    };

    cntl.addBook = function() {
        booksData.saveBook(cntl.book).then(function(addedBook) {
            $modalInstance.close(addedBook);
        });

        // alternative for stream 1
        // $modalInstance.close(cntl.book);
    };

    cntl.isFormInvalid = function() {
        return cntl.addForm.$invalid;
    };

});
