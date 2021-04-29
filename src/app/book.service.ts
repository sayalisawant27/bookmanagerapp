import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiServerUrl= environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getBooks(): Observable<Book[]>{
    return this.http.get<Book[]>(`${this.apiServerUrl}/book/all`)
  }

  public addBook(book: Book): Observable<Book>{
    return this.http.post<Book>(`${this.apiServerUrl}/book/add`, book);
  }

  public updateBook(book: Book): Observable<Book>{
    return this.http.put<Book>(`${this.apiServerUrl}/book/update`, book);
  }

  public deleteBook(bookId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/book/delete/${bookId}`);
  }
}
