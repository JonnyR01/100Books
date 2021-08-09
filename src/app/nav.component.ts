import { Component } from '@angular/core';
import { BooksComponent} from './books.component';
import { BookComponent} from './book.component';
import { AuthService } from './auth.service';

@Component({
  selector: 'navigation',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
    constructor(public AuthService: AuthService ) {}
    
}
