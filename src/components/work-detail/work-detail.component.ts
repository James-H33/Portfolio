import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-work-detail',
  templateUrl: './work-detail.component.html'
})
export class WorkDetailComponent implements OnInit {
  public direction = new Subject<string>();

  constructor(
    private elRef: ElementRef,
    @Inject('Document') private doc: Document,
    @Inject('Window') private window: Window,
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

  ngOnInit(): void {
    this.window.addEventListener('scroll', (e: any) => {
      // console.log(this.elRef.nativeElement.offsetTop);
      // console.log(e.target.documentElement.scrollTop);
      if (this.elRef.nativeElement.offsetTop === e.target.documentElement.scrollTop) {
        this.onScroll();
      }
    });
  }

  public onScroll() {
    console.log('Scrolling');
    this.direction.next('down');
  }
}
