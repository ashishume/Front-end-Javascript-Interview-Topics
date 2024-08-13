import {
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './x-input.component.html',
  styleUrls: ['./x-input.component.scss'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => XInputComponent),
      multi: true,
    },
  ],
})
export class XInputComponent implements ControlValueAccessor {
  @ViewChild('input', { static: true }) input!: ElementRef<HTMLInputElement>;

  value: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(private renderer: Renderer2) {}

  writeValue(value: string): void {
    this.value = value;
    this.resize();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('input', ['$event.target'])
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.value = inputElement.value;
    this.onChange(this.value);
    this.resize();
  }

  private resize(): void {
    const inputElement = this.input.nativeElement;

    // Reset width for correct size calculation
    this.renderer.setStyle(inputElement, 'width', 'auto');

    // Set the width based on the content
    this.renderer.setStyle(
      inputElement,
      'width',
      `${inputElement.scrollWidth}px`
    );
  }
}
