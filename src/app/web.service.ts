import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';

@Injectable()
export class WebService {
    constructor(private http: HttpClient) {}


    private book_private_list;
    private booksSubject = new Subject();
    book_list = this.booksSubject.asObservable();

    private book_private;
    private bookSubject = new Subject();
    book = this.bookSubject.asObservable();

    private reviews_private_list;
    private reviewsSubject = new Subject();
    reviews_list = this.reviewsSubject.asObservable();


    bookID;
    // returns the full list of books
    getBooks(page) {
        return this.http.get('http://localhost:5000/api/v1.0/books?pn=' + page)
           .subscribe(response => {
               this.book_private_list = response;
               this.booksSubject.next(this.book_private_list);
           })
    }
    // returns a single book
    getBook(id) {
        return this.http.get('http://localhost:5000/api/v1.0/books/' + id)
           .subscribe(response => {
               this.book_private = [response];
               this.bookSubject.next(this.book_private);
               this.bookID = id;
           })
    }
    // deletes a book
    delBook(id)
    {
        this.http.delete('http://localhost:5000/api/v1.0/books/' + id).subscribe(response => {
            this.delBook
        }
        )
    }
    // attempted to delete a book review, however it is currently non functional
    delReview(id)
    {
        this.http.delete('http://localhost:5000/api/v1.0/books/' + id + '/review').subscribe(response => {
            this.delReview(this.reviews_list);
        }
        )
    }
    // displays the reviews on a book
    getReviews(id) {
        return this.http.get('http://localhost:5000/api/v1.0/books/' + id + '/review')
           .subscribe(response => {
               this.reviews_private_list = response;
               this.reviewsSubject.next(this.reviews_private_list);
           });
    }
    // adds a new review to the current book
    postReviews(reviews) {
        let postData = new FormData();
        postData.append("username",reviews.username);
        postData.append("comment", reviews.comment);
        postData.append("stars", reviews.stars);

        let today = new Date();
        let todayDate = today.getFullYear() + "-" +
                        today.getMonth() + "-" +
                        today.getDate();
        postData.append("date", todayDate);

        this.http.post('http://localhost:5000/api/v1.0/books/' + 
                        this.bookID + '/reviews',
                        postData).subscribe(
                            response => {
                                this.getReviews(this.bookID); 
                            }
                        );
    }
    // Creates and adds a new book to the database
    postBooks(book) {
        let postBooks = new FormData();
        postBooks.append("author",book.author);
        postBooks.append("country", book.country);
        postBooks.append("imageLink", book.imageLink);
        postBooks.append("language",book.language);
        postBooks.append("link", book.link);
        postBooks.append("pages", book.pages);
        postBooks.append("title",book.title);
        postBooks.append("year", book.year);

        this.http.post('http://localhost:5000/api/v1.0/books', postBooks).subscribe(response =>{this.postBooks;})
}


}