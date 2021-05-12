import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from 'src/components/header/header.component';
import { HomeComponent } from 'src/pages/home/home.component';
import { NavLinkComponent } from '../components/nav-link/nav-link.component';
import { WorkDetailComponent } from '../components/work-detail/work-detail.component';
import { TextSliderComponent } from '../components/text-slider/text-slider.component';
import { PageScrollerService } from 'src/services/page-scroller.service';
import { BrowserService } from 'src/services/browser.service';
import { InfoComponent } from 'src/components/info/info.component';
import { CursorService } from 'src/services/cursor.service';
import { CursorDirective } from 'src/directives/cursor-hover.directive';
import { CommonModule } from '@angular/common';
import { ToastComponent } from 'src/components/toast/toast.component';
import { ClipboardDirective } from 'src/directives/clip-board-copy.directive';
import { InteractiveWaveComponent } from 'src/components/interactive-wave/interactive-wave.component';

@NgModule({
  declarations: [
    // Components
    AppComponent,
    InfoComponent,
    HeaderComponent,
    HomeComponent,
    NavLinkComponent,
    WorkDetailComponent,
    TextSliderComponent,
    ToastComponent,
    InteractiveWaveComponent,

    // Directives
    CursorDirective,
    ClipboardDirective
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [
    PageScrollerService,
    BrowserService,
    CursorService,
    { provide: 'Document', useValue: document },
    { provide: 'Window', useValue: window }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
