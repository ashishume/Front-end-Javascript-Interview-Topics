import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-ng-zone',
  standalone: true,
  imports: [],
  template: `
  <div>
      <h1>Progress: {{ progress }}%</h1>
      <button (click)="runOutsideAngular()">Start Long Task Outside Angular</button>
      <button (click)="runInsideAngular()">Start Long Task Inside Angular</button>
    </div>
    `,
  styleUrl: './ng-zone.component.scss',
})
export class NgZoneComponent {
  /**
   * there are situations where you might want to run code outside of Angular's zone,
   *  to avoid triggering change detection unnecessarily, or run it back inside Angular's zone
   * when it's necessary to update the view.
   *
   * Example:  If you have long-running tasks or tasks that don't require UI updates (like timers
   * or certain event listeners), you can run them outside Angular's zone to avoid unnecessary change detection cycles.
   */

  progress = 0;

  constructor(private ngZone: NgZone) {}

  // Run task outside Angular's zone
  runOutsideAngular() {
    this.progress = 0;
    //doesnt show the change in template
    this.ngZone.runOutsideAngular(() => {
      this.increaseProgress(() => {
        console.log('Outside Done!');
        // Run the final update inside Angular's zone
        this.ngZone.run(() => {
          //shows the change in template as its executed inside ngZone.run()
          this.progress = 100;
        });
      });
    });
  }

  // Run task inside Angular's zone
  runInsideAngular() {
    this.progress = 0;
    this.increaseProgress(() => {
      console.log('Inside Done!');
      this.progress = 100;
    });
  }

  increaseProgress(doneCallback: () => void) {
    this.progress += 1;
    console.log(`Progress: ${this.progress}%`);
    if (this.progress < 100) {
      setTimeout(() => this.increaseProgress(doneCallback), 10);
    } else {
      doneCallback();
    }
  }
}
