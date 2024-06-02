import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { combineLatest, interval, take } from 'rxjs';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-rxjs-operators',
  standalone: true,
  imports: [HomeComponent],
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
    combineLatest([
      // Create three interval observables that complete after a certain number of emissions
      interval(1000).pipe(take(5)), // Completes after 5 seconds
      interval(2000).pipe(take(3)), // Completes after 6 seconds
      interval(1500).pipe(take(4)), // Completes after 6 seconds
      // fork join waits for both of them to finish, whereas combineLatest emits multiple latest values if that observable keeps triggering
      // this.fetchPost2(),
      // this.fetchPost1(),
    ]).subscribe(([a, b,c]) => {
      console.log(a);
      console.log(b);
      console.log(c);
    });
  }
}
