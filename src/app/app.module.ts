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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NavLinkComponent,
    WorkDetailComponent,
    TextSliderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    PageScrollerService,
    { provide: 'Document', useValue: document },
    { provide: 'Window', useValue: window }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
