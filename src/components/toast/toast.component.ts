import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { ToastService } from 'src/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: 'toast.component.html'
})
export class ToastComponent implements OnInit {
  public text?: any;
  public isOpen = false;
  public animationTimeout = 300;
  public toastTimeout = 1500;
  public closeTimeout = 1500;
  private toastSubscription!: Subscription;
  private closeTimer: any;

  constructor(private toastService: ToastService) { }

  @HostListener('mouseenter') public onMouseEnter(): any {
    this.toastSubscription.unsubscribe();

    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
    }
  }

  @HostListener('mouseleave') public onMouseLeave(): any {
    if (this.isOpen) {
      this.closeTimer = setTimeout(() => {
        this.isOpen = false;
        this.closeTimer = setTimeout(() => {
          this.toastSubscription = this.subscribeToToast();
          this.toastService.queueNextToast();
        }, this.animationTimeout);
      }, this.closeTimeout);
    }
  }

  public ngOnInit(): void {
    this.toastSubscription = this.subscribeToToast();
  }

  private subscribeToToast(): Subscription {
    return this.toastService.watchChange().pipe(
      tap((text: any) => {
        console.log(text);

        this.text = text;
        this.isOpen = true;
      }),
      delay(this.toastTimeout),
      tap(() => {
        this.isOpen = false;
      }),
      delay(this.animationTimeout)
    )
    .subscribe(() => {
      this.toastService.queueNextToast();
    });
  }
}
