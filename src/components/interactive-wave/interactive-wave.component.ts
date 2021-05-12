import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';

@Component({
  selector: 'app-interactive-wave',
  templateUrl: './interactive-wave.component.html'
})
export class InteractiveWaveComponent implements AfterViewInit {
  @ViewChild('InteractiveCanvas') public canvasRef!: ElementRef;

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;

  constructor(
    @Inject('Window') private windowRef: Window
  ) { }

  public ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d') as any;

    this.canvas.width =  this.windowRef.innerWidth;
    this.canvas.height =  this.windowRef.innerHeight;

    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(0, 0, 200, 200);
  }
}
