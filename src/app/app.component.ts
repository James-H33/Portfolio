import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ScrollDirection } from 'src/models';
import { BrowserService } from 'src/services/browser.service';
import { CursorService } from 'src/services/cursor.service';
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
    {
      title: 'Camping',
      url: 'https://james-h33.github.io/Campers'
    },
    {
      title: 'NCRS',
      url: 'https://ncrs-florida.herokuapp.com'
    },
    {
      title: 'It Works!',
      url: 'https://itworks.com'
    }
  ];

  public descriptions = [
    'C# - Blazor Framework - SQL',
    'Javascript - Node - Express',
    'Javascript - Angular - Docker'
  ];

  public maxPosition = 4;

  public get isTextSliderActive(): boolean {
    return this.sliderPosition > 0 && this.sliderPosition < this.maxPosition;
  }

  constructor(
    @Inject('Document') public doc: Document,
    @Inject('Window') public windowRef: Window,
    private pageScrollerService: PageScrollerService,
    private browserService: BrowserService,
    private cursorService: CursorService
  ) { }

  public ngOnInit(): void {
    this.resetScrollPositionHistory();
    this.watchScrollEvents();
    this.browserService.init();
    this.cursorService.init();
  }

  private watchScrollEvents(): void {
    this.pageScrollerService.viewScrolledEvent.subscribe(position => {
      if (this.sliderPosition === position) {
        return;
      }

      const lastPosition = this.sliderPosition;
      this.sliderPosition = position;

      if (this.isTextSliderActive && lastPosition !== 0 && lastPosition !== this.maxPosition) {
        if (this.sliderPosition > lastPosition) {
          this.slideDirection.next(ScrollDirection.Down);
        } else {
          this.slideDirection.next(ScrollDirection.Up);
        }
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
