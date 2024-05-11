import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  fetchApiData() {
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1');
  }
}
