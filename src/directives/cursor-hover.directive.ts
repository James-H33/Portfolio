import { Directive, ElementRef, HostListener } from '@angular/core';
import { CursorService } from 'src/services/cursor.service';
import { isMobile } from 'src/utils/util.functions';

@Directive({
  selector: '[appCursorHover]'
})
export class CursorDirective {
  constructor(
    private el: ElementRef,
    private cursorService: CursorService
  ) { }

  @HostListener('mouseenter') onMouseEnter(): void {
    if (!isMobile()) {
      this.cursorService.updateHoverState();
    }
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    if (!isMobile()) {
      this.cursorService.updateHoverState();
    }
  }
}
