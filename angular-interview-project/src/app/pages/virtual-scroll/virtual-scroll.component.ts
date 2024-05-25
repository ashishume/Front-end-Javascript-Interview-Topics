import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-virtual-scroll',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ScrollingModule],
  templateUrl: './virtual-scroll.component.html',
  styleUrl: './virtual-scroll.component.scss',
})
export class VirtualScrollComponent {
  constructor(private http: HttpClient) {}
  logData: any = [];
  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http
      .get('https://jsonplaceholder.typicode.com/posts')
      .subscribe((data) => {
        console.log(data);
        this.logData = data;
      });
  }
}
