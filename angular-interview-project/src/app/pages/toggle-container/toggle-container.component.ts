import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomToggleComponent } from './custom-toggle/custom-toggle.component';

@Component({
  selector: 'app-toggle-container',
  standalone: true,
  imports: [CustomToggleComponent, ReactiveFormsModule],
  templateUrl: './toggle-container.component.html',
  styleUrl: './toggle-container.component.scss',
})
export class ToggleContainerComponent {
  form: FormGroup = new FormGroup({
    toggle: new FormControl(false, []),
  });

  onSubmit(): void {
    console.log(this.form.value);
  }
}
