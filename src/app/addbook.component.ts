import { Component } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms'
import { AuthService } from './auth.service';


@Component({
  selector: 'addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']

})
export class AddBookComponent {

  
    constructor(public webService: WebService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public authService: AuthService) {
        // validation to make sure the forms are complete and data entered
        this.addBookForm = formBuilder.group(
            {
                author: ['', Validators.required],
                country: ['', Validators.required],
                imageLink: ['', Validators.required],
                language: ['', Validators.required],
                link: ['', Validators.required],
                pages: ['', Validators.required],
                title: ['', Validators.required],
                year: ['', Validators.required]
            })





    }



  // adds book when the form is submitted
  onSubmit(){
    this.webService.postBooks(this.addBookForm.value);
    this.addBookForm.reset();
  }
  // validation
  isInvalid(control) {
    return this.addBookForm.controls[control].invalid &&
           this.addBookForm.controls[control].touched;
  }
 // validation
  isUntouched() {
    return this.addBookForm.controls.author.pristine ||
           this.addBookForm.controls.country.pristine ||
           this.addBookForm.controls.imageLink.pristine ||
           this.addBookForm.controls.language.pristine ||
           this.addBookForm.controls.link.pristine ||
           this.addBookForm.controls.pages.pristine ||
           this.addBookForm.controls.title.pristine ||
           this.addBookForm.controls.year.pristine;
  }
  // validation
  isIncomplete() {
    return this.isInvalid('author') ||
           this.isInvalid('country') ||
           this.isInvalid('imageLink') ||
           this.isInvalid('language') ||
           this.isInvalid('link') ||
           this.isInvalid('pages') ||
           this.isInvalid('title') ||
           this.isInvalid('year') ||
           this.isUntouched();
  }

  book;
  addBookForm;

}
