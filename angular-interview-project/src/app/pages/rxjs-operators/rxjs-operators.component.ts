import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-rxjs-operators',
  standalone: true,
  imports: [],
  templateUrl: './rxjs-operators.component.html',
  styleUrl: './rxjs-operators.component.scss',
})
export class RxjsOperatorsComponent {
  constructor(private http: HttpClient) {}

  fetchPost1() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts/1');
  }
  fetchPost2() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts/2');
  }

  ngOnInit() {
    forkJoin([
      // fork join waits for both of them to finish, whereas combineLatest emits multiple latest values if that observable keeps triggering
      this.fetchPost2(),
      this.fetchPost1(),
    ]).subscribe(([a, b]) => {
      console.log(a);
      console.log(b);
    });
  }
  
}
