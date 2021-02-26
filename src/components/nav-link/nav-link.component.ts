import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-link',
  templateUrl: './nav-link.component.html'
})
export class NavLinkComponent {
  @Input() public text = '';
  @Input() public link = '';
  @Input() public openInNewTab = false;
}
