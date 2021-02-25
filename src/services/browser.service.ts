import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable()
export class BrowserService {
  public browserDetails = new Subject();
  public windowSizeEvent = new Subject();

  constructor(
    @Inject('Window') private windowRef: Window,
    @Inject('Document') private documentRef: Document
  ) { }

  public init(): void {
    this.setViewportHeight();
    this.watchForResizeEvent();
    this.browserDetails.next();
  }

  public watchWindowSizeEvent(): Observable<any> {
    return (this.windowSizeEvent
      .pipe(debounceTime(200)) as any)
      .asObservable();
  }

  public getViewportHeight(): number {
    const vh = this.windowRef.innerHeight * 0.01;

    return vh * 100;
  }

  public isMobileBrowser(): void {
    return;
  }

  public watchForResizeEvent(): void {
    this.windowRef.addEventListener('resize', () => {
      this.setViewportHeight();
      this.windowSizeEvent.next();
    });
  }

  public setViewportHeight(): void {
    const vh = this.windowRef.innerHeight * 0.01;

    // Then we set the value in the --vh custom property to the root of the document
    this.documentRef.documentElement.style.setProperty('--vh', `${vh}px`);
  }
}
