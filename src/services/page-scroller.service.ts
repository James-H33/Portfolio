import { Inject, Injectable } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, first, tap } from 'rxjs/operators';
import { ScrollDirection } from 'src/models';

@Injectable()
export class PageScrollerService {
  public windowScollEvent: Subject<ScrollDirection> = new Subject();

  public scrollInterval: any;
  public currentTopPosition = 0;
  public destination = 0;
  public isScrolling = false;
  public scrollListener: any = null;

  public get totalTopPositions(): number {
    const totalDocumentHeight = this.documentRef.documentElement.scrollHeight;

    return totalDocumentHeight / this.windowRef.innerHeight;
  }

  public get totalDocumentHeight(): number {
    return this.documentRef.documentElement.scrollHeight;
  }

  public get windowHeight(): number {
    return this.windowRef.innerHeight;
  }


  constructor(
    @Inject('Window') private windowRef: Window,
    @Inject('Document') private documentRef: Document
  ) { }

  public init(): void {
    console.log('[Init Called]');

    // fromEvent(this.windowRef, 'wheel')
    //   .pipe(
    //     tap(() => console.log('[wheel]')),
    //     debounceTime(10),
    //     first(),
    //   ).subscribe(() => {
    //     this.documentRef.body.style.overflow = 'unset';
    //     this.windowRef.addEventListener('wheel', this.scrollCallback);
    //   });

    this.windowRef.addEventListener('wheel', this.wheelCallback);
  }

  public wheelCallback: any = (event: any) => {
    const direction = event.wheelDelta;

    this.documentRef.body.style.overflow = 'hidden';

    if (this.isScrolling) {
      return;
    }

    if (Math.abs(direction) < 80) {
      return;
    }

    if (direction < 0 && this.totalDocumentHeight !== (this.destination + this.windowHeight)) {
      this.isScrolling = true;
      return this.scrollDown();
    }

    if (direction > 0 && this.destination !== 0) {
      this.isScrolling = true;
      return this.scrollUp();
    }
  }

  public scrollUp(): void {
    this.currentTopPosition--;
    const windowHeight = this.windowRef.innerHeight;
    const dest = this.currentTopPosition * windowHeight;

    this.destination = dest;
    this.scrollTo(this.destination, ScrollDirection.Up);
  }

  public scrollDown(): void {
    this.currentTopPosition++;
    const windowHeight = this.windowRef.innerHeight;
    const dest = this.currentTopPosition * windowHeight;

    this.destination = dest;
    this.scrollTo(this.destination, ScrollDirection.Down);
  }

  public scrollTo(destination: number, type: ScrollDirection): void {
    this.windowRef.scrollTo({ top: destination, behavior: 'smooth' });

    setTimeout(() => {
      if (destination === this.windowRef.pageYOffset) {
        this.isScrolling = false;
      }
    }, 1000);
  }
}
