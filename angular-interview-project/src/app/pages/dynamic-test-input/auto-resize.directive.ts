import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAutoResize]',
  standalone: true,
})
export class AutoResizeDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input') onInput() {
    this.resize();
  }

  private resize(): void {
    const element = this.el.nativeElement;

    // Reset the width to calculate the new width accurately
    this.renderer.setStyle(element, 'width', 'auto');

    // Set the width based on the scrollWidth of the element
    this.renderer.setStyle(element, 'width', `${element.scrollWidth}px`);
  }
}
