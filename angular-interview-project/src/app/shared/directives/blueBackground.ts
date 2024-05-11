import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[blueBackground]',
})
export class BlueBackgroundDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('blue');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  highlight(color: string | null) {
    this.el.nativeElement.style.background = color;
  }
}
