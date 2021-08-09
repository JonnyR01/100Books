import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { BooksComponent} from './books.component';
import { WebService } from './web.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home.component';
import { BookComponent} from './book.component';
import { AuthService } from './auth.service';
import { NavComponent} from './nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { AddBookComponent } from './addbook.component';




var routes = [
{
  path: '',
  component: HomeComponent
},
{
  path: 'books',
  component: BooksComponent
},
{
  path: 'books/:id',
  component: BookComponent
},

{
  path:'addbook',
  component: AddBookComponent
}
];


@NgModule({
  declarations: [
    AppComponent, BooksComponent, HomeComponent, BookComponent, NavComponent, AddBookComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, RouterModule.forRoot(routes),
    FormsModule, ReactiveFormsModule, Ng2SearchPipeModule, NgxPaginationModule
  ],
  providers: [WebService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
