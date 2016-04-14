angular.module('app.books-management').controller('EditBookCntl', function(book, $modalInstance) {
    'use strict';

    var cntl = this;

    cntl.book = angular.copy(book);

    cntl.editForm = {};

    cntl.editBook = function() {
            $modalInstance.close();
    };

    cntl.cancel = function() {
        $modalInstance.dismiss('cancel');
    };

    cntl.isFormInvalid = function() {
        return cntl.editForm.$invalid;
    };
});
