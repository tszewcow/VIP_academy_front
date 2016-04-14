angular.module('app.books-management').controller('AddBookCntl', function($modalInstance) {
    'use strict';

    var cntl = this;

    this.book = {};

    this.addForm = {};

    this.cancel = function() {
        $modalInstance.dismiss('cancel');
    };

    this.addBook = function() {
        $modalInstance.close();
    }

    this.isFormInvalid = function() {
        return this.addForm.$invalid;
    };

});
