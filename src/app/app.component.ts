import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ScrollDirection } from 'src/models';
import { PageScrollerService } from 'src/services/page-scroller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Portfolio';
  sliderPosition = 0;
  public slideDirection = new Subject<any>();

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

  public get isTextSliderActive(): boolean {
    return this.sliderPosition > 0;
  }

  constructor(
    @Inject('Document') public doc: Document,
    @Inject('Window') public windowRef: Window,
    private pageScrollerService: PageScrollerService,
  ) { }

  public ngOnInit(): void {
    this.resetScrollPositionHistory();
    this.pageScrollerService.viewScrolledEvent.subscribe(position => {
      if (this.sliderPosition === position) {
        return;
      }

      const lastPosition = this.sliderPosition;
      this.sliderPosition = position;

      if (this.isTextSliderActive && lastPosition !== 0) {
        if (this.sliderPosition > lastPosition) {
          this.slideDirection.next(ScrollDirection.Down);
        } else {
          this.slideDirection.next(ScrollDirection.Up);
        }
      }
    });

    this.doc.addEventListener('DOMContentLoaded', () => {
      const isMobileBreakPoint = this.windowRef.innerWidth < 720;
      const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);

      if (isMobileBreakPoint && isMobileDevice) {
        this.doc.body.classList.add('is-mobile-browser');
      }
    });
  }

  public resetScrollPositionHistory(): void {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    this.windowRef.scrollTo({ top: 0 });
  }
}
