import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Subject } from 'rxjs';

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

  public ngOnInit(): void {
    setTimeout(() => {
      console.log(this.sliderText);

      const height = this.textSize + (this.textSize * .20);
      this.slider.nativeElement.style.height = `${height}px`;
      this.sliderTextWrapper.nativeElement.style.top = 0;
      this.sliderTextWrapper.nativeElement.style.height = `${height * this.values.length}px`;

      this.sliderText?.forEach(el => {
        el.nativeElement.style.fontSize = `${this.textSize}px`;
        el.nativeElement.style.color = `${this.color}`;
      });
    }, 1000);

    if (this.direction) {
      this.direction.subscribe((dir: any) => {
        this.slide();
      });
    }
  }

  public slide() {
    this.slideDown();
  }

  public slideUp() {
    const heightOfOneSection = this.textSize + (this.textSize * .20);

    if (this.currentIndex - 1 === 0) {
      this.sliderTextWrapper.nativeElement.style.top = '0px';
    } else {
      --this.currentIndex;
      this.sliderTextWrapper.nativeElement.style.top = `-${(heightOfOneSection * this.currentIndex)}px`;
    }
  }

  public slideDown() {
    const heightOfOneSection = this.textSize + (this.textSize * .20);
    if (this.currentIndex + 1 <= (this.values.length  - 1)) {
      ++this.currentIndex;
      this.sliderTextWrapper.nativeElement.style.top = `-${(heightOfOneSection * this.currentIndex)}px`;
    }
  }
}
