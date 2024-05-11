import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  fetchApiData() {
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1').pipe(
      retry(3),
      catchError((e) => e)
    );
  }
}
