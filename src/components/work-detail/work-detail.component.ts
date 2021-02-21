import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ScrollDirection } from 'src/models';
import { PageScrollerService } from 'src/services/page-scroller.service';

@Component({
  selector: 'app-work-detail',
  templateUrl: './work-detail.component.html'
})
export class WorkDetailComponent implements OnInit {
  public direction = new Subject<string>();

  constructor(
    private elRef: ElementRef,
    @Inject('Document') private doc: Document,
    @Inject('Window') private windowRef: Window,
    private pageScrollerService: PageScrollerService
  ) { }

  public titles = [
    'Flights',
    'Camping',
    'NCRS'
  ];

  public descriptions = [
    'C# - Blazor Framework',
    'C# - Blazor Framework',
    'Javascript - Node - Express'
  ];

  public get slider(): HTMLElement {
    return this.elRef.nativeElement.querySelector('.work-item-slider');
  }

  public get windowHeight(): number {
    return this.windowRef.innerHeight;
  }

  public get totalContentHeight(): number {
    return this.titles.length * this.windowRef.innerHeight;
  }

  ngOnInit(): void {
    let touchStartPosition = 0;
    let touchMovePosition = 0;
    let lastTop = 0;
    let distanceMoved = 0;

    this.windowRef.addEventListener('touchstart', (event) => {
      console.log('TouchStart');
      this.slider.style.transition = 'unset';
      touchStartPosition = event.changedTouches[0].pageY;
    });

    this.windowRef.addEventListener('touchmove', (event) => {
      touchMovePosition = event.changedTouches[0].pageY;
      distanceMoved = lastTop + (touchStartPosition - touchMovePosition);
      this.slider.style.transform = `translateY(-${distanceMoved}px)`;
    });

    this.windowRef.addEventListener('touchend', () => {
      console.log('touchend');
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

        if (!isAtBounds) {
          this.onScroll(direction);
        }

        nextTop = isAtBounds ? lastTop : nextTop;
        lastTop = nextTop;
      } else {
        nextTop = lastTop;
      }

      this.slider.style.transition = '1000ms ease';
      this.slider.style.transform = `translateY(-${nextTop}px)`;
    });
  }

  public onScroll(direction: ScrollDirection): void {
    this.direction.next(direction);
  }
}
