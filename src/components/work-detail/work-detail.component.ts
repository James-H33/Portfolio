import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ScrollDirection } from 'src/models';

@Component({
  selector: 'app-work-detail',
  templateUrl: './work-detail.component.html'
})
export class WorkDetailComponent implements OnInit {
  public direction = new Subject<string>();
  public watch: any;
  public enableTextSlider = false;

  constructor(
    private elRef: ElementRef,
    @Inject('Document') private doc: Document,
    @Inject('Window') private windowRef: Window
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

  public get isComponentInView(): boolean {
    return this.windowRef.pageYOffset === this.elRef.nativeElement.offsetTop;
  }

  public get isMobile(): boolean {
    return this.windowRef.innerWidth < 800;
  }


  public get windowHeight(): number {
    return this.windowRef.innerHeight;
  }

  public get totalContentHeight(): number {
    return this.titles.length * this.windowRef.innerHeight;
  }

  ngOnInit(): void {
    this.watch = setInterval(() => {
      if (this.isComponentInView) {
        this.enableTextSlider = true;
        clearInterval(this.watch);
      }
    }, 50);
  }

  public onScroll(direction: ScrollDirection): void {
    this.direction.next(direction);
  }
}
