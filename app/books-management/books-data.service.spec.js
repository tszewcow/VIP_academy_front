describe('booksData service tests', function () {
    'use strict';

    var booksData, $httpBackend;
    beforeEach(module('app.books-management'));
    beforeEach(inject(function (_booksData_, _$httpBackend_) {
        booksData = _booksData_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function () {
        // then
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should load books', function () {
        // given
        var searchParams = {title: 'title', author: 'author'}, books = [], response = [
            {id: 0, title: 'title1'},
            {id: 1, title: 'title2'}
        ];
        $httpBackend.expectGET('/books-management/books-list/books.json?author=author&title=title').respond(response);
        // when
        booksData.getBooks(searchParams).then(function (response) {
            books = response.data;
        });
        $httpBackend.flush();
        // then
        expect(books).toEqual(response);
    });

    it('should save the book', function () {
        // given
        var bookBeforeSave = {
            genre: 'it',
            year: 1999,
            title: 'Code Complete',
            author: 'Steve McConnell'
        };
        $httpBackend.expectPOST('/book').respond(201);
        // when
        booksData.saveBook(bookBeforeSave);
        $httpBackend.flush();
    });

    it('should update book', function () {
        // given
        var book = {
            id: 1,
            version: 0,
            genre: 'it',
            year: 1999,
            title: 'Code Complete',
            author: 'Steve McConnell'
        };
        $httpBackend.expectPUT('/book/' + book.id).respond(200);
        // when
        booksData.updateBook(book);
        $httpBackend.flush();
    });

    it('should delete book', function () {
        // given
        var bookId = 1;
        $httpBackend.expectDELETE('/book/' + bookId).respond(200);
        // when
        booksData.deleteBook(1);
        $httpBackend.flush();
    });
});