import { Component } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms'
import { AuthService } from './auth.service';


@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']

})
export class BookComponent {

  reviewForm;

  // sets the page number for pagination
  p: number = 1;

  constructor(public webService: WebService,
              public route: ActivatedRoute,
              public formBuilder: FormBuilder,
              public authService: AuthService ) {}



  ngOnInit() {

      this.reviewForm = this.formBuilder.group( {
        username: ['', Validators.required],
        comment: ['', Validators.required],
        stars: 5
    })
    this.webService.getBook(this.route.snapshot.params.id);
    this.webService.getReviews(this.route.snapshot.params.id);
  }

  onSubmit(){
    // posts the review when the submit button is clicked
    this.webService.postReviews(this.reviewForm.value);
    this.reviewForm.reset();
  }

  isInvalid(control) {
    // validation for adding a review
    return this.reviewForm.controls[control].invalid &&
           this.reviewForm.controls[control].touched;
  }

  isUntouched() {
    // validation for adding a review if nothing is entered
    return this.reviewForm.controls.username.pristine ||
           this.reviewForm.controls.comment.pristine;
  }

  isIncomplete() {
    return this.isInvalid('username') ||
           this.isInvalid('comment') ||
           this.isUntouched();
  }

  onDelete() {
    // Deletes a book from the database
    this.webService.delBook(this.route.snapshot.params.id);
    
  }

  // onDeleteReview()
  // {
  //   this.webService.delReview(this.route.snapshot.params.id);
  // }

  book;

}
