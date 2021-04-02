import { Inject, Injectable } from '@angular/core';
import { isMobile } from 'src/utils/util.functions';

@Injectable()
export class CursorService {
  public cursorElement?: HTMLElement | any;
  public isHoverActive = false;

  constructor(
    @Inject('Window') private windowRef: Window,
    @Inject('Document') private doc: Document,
  ) { }

  public init(): void {
    if (isMobile()) {
      return;
    }

    this.cursorElement = this.doc.querySelector('.cursor') as HTMLElement;

    this.windowRef.addEventListener('mousemove', (event) => {
      this.cursorElement.style.left = event.clientX + 'px';
      this.cursorElement.style.top = event.clientY + 'px';
    });
  }

  public updateHoverState(): void {
    this.isHoverActive = !this.isHoverActive;

    if (this.isHoverActive) {
      this.cursorElement.classList.add('hovered');
    } else {
      this.cursorElement.classList.remove('hovered');
    }
  }
}
