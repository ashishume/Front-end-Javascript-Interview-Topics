import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
})
export class ChildComponent {
  /** private var to store the parent's value */
  private _childValue: string = '';

  /** return the private var value */
  @Input() get childValue(): string {
    return this._childValue;
  }
  /** assign the incoming value to private var */
  set childValue(value: string) {
    this._childValue = value;

    /** emit new changes to the back to parent */
    this.childValueChange.emit(this._childValue);
  }

  /** output to emit new values */
  @Output() childValueChange: EventEmitter<string> = new EventEmitter<string>();
}
