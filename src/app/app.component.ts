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
    this.doc.addEventListener('DOMContentLoaded', () => {
      const isMobileBreakPoint = this.windowRef.innerWidth < 720;
      const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);

      if (isMobileBreakPoint && isMobileDevice) {
        this.doc.body.classList.add('is-mobile-browser');
      }
    });

    // this.windowRef.addEventListener('resize', (event: Event) => {
    //   console.log(event);

      // this.doc.body.classList.add('is-mobile-browser');
    // });
    // this.pageScrollerService.init();
  }
}
