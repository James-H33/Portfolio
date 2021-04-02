import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private templateChange = new Subject<string>();
  private dismissChange = new Subject();
  public toasts: any = [];
  public activeToast: any;

  public watchChange(): Observable<string> {
    return this.templateChange.asObservable();
  }

  public watchDismissChange(): Observable<any> {
    return this.dismissChange.asObservable();
  }

  public show(text: string): void {
    if (!this.activeToast) {
      this.activeToast = text;
      this.templateChange.next(text);
    } else {
      this.toasts.push(text);
    }
  }

  public dismiss(): void {
    this.dismissChange.next();
  }

  public queueNextToast(): void {
    this.activeToast = this.toasts.shift();

    if (this.activeToast) {
      this.templateChange.next(this.activeToast);
    }
  }
}
