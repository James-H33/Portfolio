import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PageScrollerService } from 'src/services/page-scroller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Portfolio';

  constructor(
    @Inject('Document') public doc: Document,
    @Inject('Window') public windowRef: Window,
    private pageScrollerService: PageScrollerService,
  ) { }

  public ngOnInit(): void {
    this.resetScrollPositionHistory();

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
