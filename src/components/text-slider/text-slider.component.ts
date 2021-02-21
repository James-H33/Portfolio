import { Component, ElementRef, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Subject } from 'rxjs';
import { ScrollDirection } from 'src/models';

@Component({
  selector: 'app-text-slider',
  templateUrl: './text-slider.component.html'
})
export class TextSliderComponent implements OnInit {
  @Input() public color = '#fff';
  @Input() public textSize = 16;
  @Input() public values: string[] = [];
  @Input() public direction?: Subject<string>;

  @ViewChild('Slider') public slider!: ElementRef;
  @ViewChild('SliderTextWrapper') public sliderTextWrapper!: ElementRef;
  @ViewChildren('SliderText') public sliderText?: ElementRef[] = [];

  public currentIndex = 0;

  public get singleElementHeight(): number {
    const paddingSize = 40;
    return this.textSize + (this.textSize * .20) + paddingSize;
  }

  public ngOnInit(): void {
    setTimeout(() => {
      const height = this.singleElementHeight;
      this.slider.nativeElement.style.height = `${height}px`;
      this.sliderTextWrapper.nativeElement.style.top = 0;
      this.sliderTextWrapper.nativeElement.style.height = `${height * this.values.length}px`;

      this.sliderText?.forEach(el => {
        el.nativeElement.style.fontSize = `${this.textSize}px`;
        el.nativeElement.style.color = `${this.color}`;
      });
    }, 750);

    if (this.direction) {
      this.direction.subscribe((dir: any) => this.slide(dir));
    }
  }

  public slide(dir: ScrollDirection): void {
    if (ScrollDirection.Down === dir) {
      this.slideDown();
    } else {
      this.slideUp();
    }
  }

  public slideUp(): void {
    if (this.currentIndex - 1 === 0) {
      --this.currentIndex;
      this.sliderTextWrapper.nativeElement.style.top = '0px';
    } else {
      --this.currentIndex;
      this.sliderTextWrapper.nativeElement.style.top = `-${(this.singleElementHeight * this.currentIndex)}px`;
    }
  }

  public slideDown(): void {
    if (this.currentIndex + 1 <= (this.values.length  - 1)) {
      ++this.currentIndex;
      this.sliderTextWrapper.nativeElement.style.top = `-${(this.singleElementHeight * this.currentIndex)}px`;
    }
  }
}
