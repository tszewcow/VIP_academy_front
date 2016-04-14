angular.module('app.books-management').controller('AddBookCntl', function($modalInstance) {
    'use strict';

    var cntl = this;

    cntl.book = {};

    cntl.addForm = {};

    cntl.cancel = function() {
        $modalInstance.dismiss('cancel');
    };

    cntl.addBook = function() {
        $modalInstance.close();
    }

    cntl.isFormInvalid = function() {
        return cntl.addForm.$invalid;
    };

});
