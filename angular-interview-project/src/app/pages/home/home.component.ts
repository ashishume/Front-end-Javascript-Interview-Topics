import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { SharedModule } from '../../shared/modules/shared.module';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [CommonModule, SharedModule],
  // encapsulation: ViewEncapsulation.ShadowDom,  default is Emulated
})
export class HomeComponent {
  @ViewChild('containerTemp') containerTemp!: ElementRef<HTMLDivElement>;
  @Input() name: string = '';

  arr = ['ashish', 'debnath', 'is', 'a', 'Software', 'Developer'];

  ngOnInit() {
    console.log('on init', this.name);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    
    console.log('on changes', this.name);

    //triggers on changes detection with previous and current value
  }

  ngDoCheck() {
    //trigggers on every change detection we can implement our own change detection logic which angular cant detect
    // console.log('called');
  }
  ngAfterContentInit() {
    //triggers when ng-content is initialised and we want to operate inside the ng-content data
  }
  ngAfterContentChecked() {
    //when ng-content is checked for changes, we can operate operations on them
  }

  ngAfterViewInit() {
    console.log('view init', this.name);

    //when the components view and child views are initialised
  }
  ngAfterViewChecked() {
    //when the components view and child views are checked for initialised, we can operate update oeprations when they are loaded
  }

  ngOnDestroy() {
    // to destroy subscriptions
  }
}
