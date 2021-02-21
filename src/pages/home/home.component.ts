import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { PageScrollerService } from 'src/services/page-scroller.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isScrolling = false;
  public sliderPosition = 0;
  public minSliderPosition = 0;
  public maxSliderPosition = 3;

  constructor(
    private elRef: ElementRef,
    @Inject('Document') private doc: Document,
    @Inject('Window') private windowRef: Window,
    private pageScrollerService: PageScrollerService
  ) { }

  public get isMobile(): boolean {
    return this.windowRef.innerWidth < 800;
  }

  public get homeSlider(): HTMLElement {
    return this.elRef.nativeElement.querySelector('.home');
  }

  public get textSlider(): HTMLElement {
    return this.elRef.nativeElement.querySelector('.text-slider');
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
      let nextTop = 0;

      if (isScrolling) {
        return;
      }

      if (!this.isMoveThresholdMet(delta)) {
        return;
      }

      if (delta < 0 && this.totalContentHeight !== (lastTop + this.windowHeight)) {
        isScrolling = true;
        nextTop = lastTop + this.windowHeight;
        lastTop = nextTop;
        this.sliderPosition++;

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
        this.sliderPosition--;

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

      if (distanceMoved !== 0 && this.isMoveThresholdMet(distanceMoved - lastTop)) {
        if (distanceMoved < lastTop) {
          nextTop = lastTop - this.windowHeight;
          this.setSliderPostion(--this.sliderPosition);
        } else {
          nextTop = lastTop + this.windowHeight;
          this.setSliderPostion(++this.sliderPosition);
        }

        const isAtTop = nextTop < 0;
        const isAtBottom = nextTop >= this.totalContentHeight;
        const isAtBounds = isAtTop || isAtBottom;

        nextTop = isAtBounds ? lastTop : nextTop;
        lastTop = nextTop;
      } else {
        nextTop = lastTop;
      }

      this.moveSlider(nextTop);
    });
  }

  public moveSlider(nextPosition: number, cb?: any): void {
    this.pageScrollerService.viewScrolledEvent.next(this.sliderPosition);
    this.homeSlider.style.transition = '1000ms ease';
    this.homeSlider.style.transform = `translateY(-${nextPosition}px)`;

    if (cb) {
      cb();
    }
  }

  private setSliderPostion(newPosition: number): void {
    if (newPosition > this.maxSliderPosition) {
      this.sliderPosition = this.maxSliderPosition;
    } else if (newPosition < this.minSliderPosition) {
      this.sliderPosition = this.minSliderPosition;
    } else {
      this.sliderPosition = newPosition;
    }
  }

  private isMoveThresholdMet(delta: number): boolean {
    return Math.abs(delta) > 60;
  }
}
