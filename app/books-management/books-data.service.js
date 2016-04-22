angular.module('app.books-management').factory('booksData', function($http) {
    'use strict';

    return {
        getBooks: function(searchParams) {
            return $http.get('http://localhost:9000/services/books', {params: searchParams});
            // return $http.get('/books-management/books-list/books.json', {
            //     params: searchParams
            // });
        },
        saveBook: function(book) {
            return $http.post('http://localhost:9000/services/book', book);
        },
        updateBook: function(book) {
            return $http.put('http://localhost:9000/services/book', book);
        },
        deleteBook: function(id) {
            return $http.delete('http://localhost:9000/services/book/' + id);
        }
    };
});
