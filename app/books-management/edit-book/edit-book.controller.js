angular.module('app.books-management').controller('EditBookCntl', function(book, $modalInstance, booksData) {
    'use strict';

    var cntl = this;

    cntl.book = angular.copy(book);

    cntl.editForm = {};

    cntl.isFormInvalid = function() {
        return cntl.editForm.$invalid;
    };

    cntl.cancel = function() {
        $modalInstance.dismiss('cancel');
    };

    cntl.editBook = function() {
        booksData.updateBook(cntl.book).then(function(editedBook) {
            $modalInstance.close(editedBook);
        });

        // alternative for stream 1
        // $modalInstance.close(cntl.book);
    };
});
