describe('booksData service tests', function () {
    'use strict';

    var booksData;
    beforeEach(module('app.books-management'));
    beforeEach(inject(function (_booksData_) {
        booksData = _booksData_;
    }));

    it('should call $http.get when books.getBooks is called', inject(function($http){
        // given
        var searchParams = {title: 'title', author: 'author'};
        spyOn($http, 'get');
        // when
        booksData.getBooks(searchParams);
        // then
        expect($http.get).toHaveBeenCalledWith('/books-management/books-list/books.json',{params: searchParams});
    }));

    it('should call $http.post when books.saveBook is called',  inject(function($http){
        // given
        var book =  {
            "id": 1,
            "version": 0,
            "genre": "it",
            "year": 1999,
            "title": "Code Complete",
            "author": "Steve McConnell"
        };
        spyOn($http, 'post');
        // when
        booksData.saveBook(book);
        // then
        expect($http.post).toHaveBeenCalledWith('/book/1', book);
    }));

    it('should call $http.put when books.updateBook is called',  inject(function($http){
        // given
        var book =  {
            "id": 1,
            "version": 0,
            "genre": "it",
            "year": 1999,
            "title": "Code Complete",
            "author": "Steve McConnell"
        };
        spyOn($http, 'put');
        // when
        booksData.updateBook(book);
        // then
        expect($http.put).toHaveBeenCalledWith('/book/1', book);
    }));

    it('should call $http.delete when books.deleteBook is called',  inject(function($http){
        // given
        spyOn($http, 'delete');
        // when
        booksData.deleteBook(1);
        // then
        expect($http.delete).toHaveBeenCalledWith('/book/1');
    }));

});
