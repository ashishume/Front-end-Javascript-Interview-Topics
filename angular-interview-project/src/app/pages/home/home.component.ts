import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { SharedModule } from '../../shared/modules/shared.module';
import { UppercasePipe } from '../../shared/pipes/uppercase.pipe';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [CommonModule, SharedModule, UppercasePipe],
  // changeDetection:ChangeDetectionStrategy.OnPush  default is ChangeDetectionStrategy.Default
  // encapsulation: ViewEncapsulation.ShadowDom,  default is Emulated
})
export class HomeComponent {
  /** reusable components mean using input output decorators */

  @ViewChild('containerTemp') containerTemp!: ElementRef<HTMLDivElement>;
  @Input() name: string = '';
  contextExp = 'Ashish Debnath';
  arr = ['ashish', 'debnath', 'is', 'a', 'Software', 'Developer'];
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  //head to the elements tab in browser --> select the selector --> ng.getComponent($0) // browser console to get the instance of angular component

  //Order 1
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    console.log('on changes', this.name);
    //triggers on changes detection with previous and current value
  }

  //Order 2
  ngOnInit() {
    console.log('on init', this.name);
  }

  //Order 3
  ngDoCheck() {
    //trigggers on every change detection we can implement our own change detection logic which angular cant detect
    // console.log('called');
  }

  //Order 4
  ngAfterContentInit() {
    //triggers when ng-content is initialised and we want to operate inside the ng-content data
  }

  //Order 5
  ngAfterContentChecked() {
    //when ng-content is checked for changes, we can operate operations on them
  }

  //Order 6
  ngAfterViewInit() {
    console.log('view init', this.name);
    //when the components view and child views are initialised
  }

  //Order 7
  ngAfterViewChecked() {
    //when the components view and child views are checked for initialised, we can operate update oeprations when they are loaded
  }

  //on component destroy
  ngOnDestroy() {
    // to destroy subscriptions
  }
}
