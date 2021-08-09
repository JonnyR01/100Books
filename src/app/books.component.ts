import { Component } from '@angular/core';
import { WebService } from './web.service';

@Component({
  selector: 'books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {
  // pagination
  p: number = 1;
  // used to set the filter to pick up string
  filterTerm: string;
  constructor(public webService: WebService ) {}

  ngOnInit() {
    if (sessionStorage.page) {
      this.page = sessionStorage.page;
    }
   this.webService.getBooks(this.page);

  }

  nextPage() {
    this.page = Number(this.page) + 1;
    sessionStorage.page = Number(this.page);
    this.webService.getBooks(this.page);
  }

  previousPage() {
    if (this.page > 1) {
      this.page = Number(this.page) - 1;
      sessionStorage.page = Number(this.page);
      this.webService.getBooks(this.page);
    }
  }

  book_list;
  page = 1;
}
