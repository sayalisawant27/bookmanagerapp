import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { error } from 'selenium-webdriver';
import { Book } from './book';
import { BookService } from './book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public books: Book[];
  public editBook: Book;
  public deleteBook: Book;

  constructor(private bookService: BookService) { }

  ngOnInit(){
    this.getBooks();
  }

  public getBooks(): void{
    this.bookService.getBooks().subscribe(
      (response: Book[])=> {
        this.books= response;
      },
      (error: HttpErrorResponse)=> {
        alert(error.message);
      }
    );
  }

  public onOpenModal(book: Book, mode: string): void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode === 'add'){
      button.setAttribute('data-target','#addBookModal');
    }
    if(mode === 'edit'){
      this.editBook=book;
      button.setAttribute('data-target','#updateBookModal');
    }
    if(mode === 'delete'){
      this.deleteBook=book;
      button.setAttribute('data-target','#deleteBookModal');
    }
    container.appendChild(button);
    button.click();
  }

  public onAddBook(addForm: NgForm): void{
    document.getElementById("add-book-form").click();
    this.bookService.addBook(addForm.value).subscribe(
      (response: Book)=> {
        console.log(response);
        this.getBooks();
        addForm.reset();
      },
      (error: HttpErrorResponse)=> {
        alert(error.message);
        addForm.reset();
      }
    );

  }

  public onUpdateBook(book: Book): void{
    this.bookService.updateBook(book).subscribe(
      (response: Book)=> {
        console.log(response);
        this.getBooks();
      },
      (error: HttpErrorResponse)=> {
        alert(error.message);
      }
    );
  }

  public onDeleteBook(bookId: number): void{
    document.getElementById("close-modal").click();
    this.bookService.deleteBook(bookId).subscribe(
      (response: void)=> {
        this.getBooks();
      },
      (error: HttpErrorResponse)=> {
        alert(error.message);
      }
    );
  }

  public searchBooks(key: string): void{
    const results: Book[] = [];
    for (const book of this.books){
      if(book.name.toLowerCase().indexOf(key.toLowerCase())!== -1 ||
      book.author.toLowerCase().indexOf(key.toLowerCase())!== -1 ||
      book.publication.toLowerCase().indexOf(key.toLowerCase())!== -1){
        results.push(book);
      }
    }
    this.books=results;
    if(results.length === 0 || !key){
      this.getBooks();
    }
  }

}

