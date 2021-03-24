import { Directive, ElementRef, HostListener } from '@angular/core';
import { CursorService } from 'src/services/cursor.service';

@Directive({
  selector: '[appCursorHover]'
})
export class CursorDirective {
  constructor(
    private el: ElementRef,
    private cursorService: CursorService
  ) { }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.cursorService.updateHoverState();
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.cursorService.updateHoverState();
  }
}
