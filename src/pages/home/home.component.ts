import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { ScrollDirection } from 'src/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isScrolling = false;

  constructor(
    private elRef: ElementRef,
    @Inject('Document') private doc: Document,
    @Inject('Window') private windowRef: Window,
  ) { }

  public get isMobile(): boolean {
    return this.windowRef.innerWidth < 800;
  }

  public get homeSlider(): HTMLElement {
    return this.elRef.nativeElement.querySelector('.home');
  }

  public get windowHeight(): number {
    return this.windowRef.innerHeight;
  }

  public get totalContentHeight(): number {
    return 4 * this.windowRef.innerHeight;
  }

  public get homeIntro(): HTMLElement {
    return this.elRef.nativeElement.querySelector('.home-intro');
  }

  ngOnInit(): void {
    if (this.isMobile) {
      this.initializeMobileScrolling();
    } else {
      this.initializeDesktopScrolling();
    }
  }

  public initializeDesktopScrolling(): void {
    let lastTop = 0;
    let isScrolling = false;

    this.windowRef.addEventListener('wheel', (event: any) => {
      const delta = event.wheelDelta;
      let direction: any;
      let nextTop = 0;

      if (isScrolling) {
        return;
      }

      if (Math.abs(delta) < 80) {
        return;
      }

      if (delta < 0 && this.totalContentHeight !== (lastTop + this.windowHeight)) {
        isScrolling = true;
        nextTop = lastTop + this.windowHeight;
        lastTop = nextTop;
        direction = ScrollDirection.Down;

        return this.moveSlider(nextTop, () => {
          setTimeout(() => {
            isScrolling = false;
          }, 1000);
        });
      }


      if (delta > 0 && (lastTop - this.windowHeight >= 0)) {
        isScrolling = true;
        nextTop = lastTop - this.windowHeight;
        lastTop = nextTop;
        direction = ScrollDirection.Up;

        return this.moveSlider(nextTop, () => {
          setTimeout(() => {
            isScrolling = false;
          }, 1000);
        });
      }
    });
  }

  public initializeMobileScrolling(): void {
    let touchStartPosition = 0;
    let touchMovePosition = 0;
    let lastTop = 0;
    let distanceMoved = 0;

    this.windowRef.addEventListener('touchstart', (event) => {
      touchStartPosition = event.changedTouches[0].pageY;
      distanceMoved = 0;
    });

    this.windowRef.addEventListener('touchmove', (event) => {
      touchMovePosition = event.changedTouches[0].pageY;
      distanceMoved = lastTop + (touchStartPosition - touchMovePosition);
      this.homeSlider.style.transform = `translateY(-${distanceMoved}px)`;
    });

    this.windowRef.addEventListener('touchend', () => {
      let nextTop = 0;
      let direction;

      if (Math.abs(distanceMoved - lastTop) > 75) {
        if (distanceMoved < lastTop) {
          nextTop = lastTop - this.windowHeight;
          direction = ScrollDirection.Up;
        } else {
          nextTop = lastTop + this.windowHeight;
          direction = ScrollDirection.Down;
        }

        const isAtTop = nextTop < 0;
        const isAtBottom = nextTop >= this.totalContentHeight;
        const isAtBounds = isAtTop || isAtBottom;

        // if (!isAtBounds) {
        //   this.onScroll(direction);
        // }

        nextTop = isAtBounds ? lastTop : nextTop;
        lastTop = nextTop;
      } else {
        nextTop = lastTop;
      }

      this.moveSlider(nextTop);
    });
  }

  public moveSlider(nextPosition: number, cb?: any): void {
    this.homeSlider.style.transition = '1000ms ease';
    this.homeSlider.style.transform = `translateY(-${nextPosition}px)`;

    if (cb) {
      cb();
    }
  }
}
