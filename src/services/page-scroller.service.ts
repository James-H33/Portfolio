import { Inject, Injectable } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, first, tap } from 'rxjs/operators';
import { ScrollDirection } from 'src/models';

@Injectable()
export class PageScrollerService {
  public viewScrolledEvent: Subject<number> = new Subject();

  constructor(
    @Inject('Window') private windowRef: Window,
    @Inject('Document') private documentRef: Document
  ) { }

  public init(): void {}
}
