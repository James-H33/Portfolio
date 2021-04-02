import { Directive, ElementRef, HostListener, Inject, Input } from '@angular/core';
import { ToastService } from 'src/services/toast.service';

@Directive({
  selector: '[appClipboard]'
})
export class ClipboardDirective {
  @Input() clipboardValue!: string;
  private copyClipboardId = 'clipboard';

  constructor(
    private el: ElementRef,
    private toastService: ToastService,
    @Inject('Document') private documentRef: Document
  ) { }

  @HostListener('click', ['$event']) onClick(event: any): void {
    this.handleClick(event);
  }

  private handleClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopImmediatePropagation();

    if (!this.clipboardValue) {
      return;
    }

    this.applyElement();

    this.toastService.show('Copied');

    const element: any = this.documentRef.querySelector(`#${this.copyClipboardId}`);
    (element as any).select();
    this.documentRef.execCommand('copy');
    element.remove();
  }

  private applyElement(): void {
    const input = this.documentRef.createElement('input');
    input.id = this.copyClipboardId;
    input.type = 'text';
    input.value = this.clipboardValue;
    this.documentRef.body.appendChild(input);
  }
}
