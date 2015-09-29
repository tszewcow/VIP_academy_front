angular.module('app.books-management').factory('booksData', function ($http) {
    'use strict';

    return {
        getBooks: function (searchParams) {
            //return $http.get('/books', {params: searchParams});
            return $http.get('/books-management/books-list/books.json', {params: searchParams});
        },
        saveBook: function (book) {
            return $http.post('/book', book);
        },
        updateBook: function (book) {
            return $http.put('/book/' + book.id, book);
        },
        deleteBook: function (id) {
            return $http.delete('/book/' + id);
        }
    };
});
