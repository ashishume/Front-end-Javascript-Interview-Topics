import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from '../../shared/modules/shared.module';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [CommonModule,SharedModule],
  // encapsulation: ViewEncapsulation.ShadowDom,  default is Emulated
})
export class HomeComponent {
  arr = ['ashish', 'debnath', 'is', 'a', 'Software', 'Developer'];

  ngDoCheck() {
    //trigggers on every change detection we can implement our own change detection logic which angular cant detect
    console.log('called');
  }
  ngAfterContentInit() {
    //triggers when ng-content is initialised and we want to operate inside the ng-content data
  }
  ngAfterContentChecked() {
    //when ng-content is checked for changes, we can operate operations on them
  }

  ngAfterViewInit() {
    //when the components view and child views are initialised
  }
  ngAfterViewChecked() {
    //when the components view and child views are checked for initialised, we can operate update oeprations when they are loaded
  }

  ngOnDestroy() {
    // to destroy subscriptions
  }
}
