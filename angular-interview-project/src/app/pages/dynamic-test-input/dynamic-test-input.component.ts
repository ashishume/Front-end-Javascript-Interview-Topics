import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AutoResizeDirective } from './auto-resize.directive';
import { XInputComponent } from './x-input/x-input.component';

@Component({
  selector: 'app-dynamic-test-input',
  standalone: true,
  imports: [ReactiveFormsModule, AutoResizeDirective, XInputComponent],
  templateUrl: './dynamic-test-input.component.html',
  styleUrl: './dynamic-test-input.component.scss',
})
export class DynamicTestInputComponent {
  public formGroup: FormGroup = new FormGroup({
    customInput: new FormControl('', []),
  });
}
