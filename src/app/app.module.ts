import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { BlogModule } from './blog/blog.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { AboutModule } from './about/about.module';
import { MenuModule } from './menu/menu.module';
import { ReservationModule } from './reservation/reservation.module';
import { LayoutModule } from './layout/layout.module';
import { StartModule } from './start/start.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    SharedModule,
    LayoutModule,
    BlogModule,
    MenuModule,
    StartModule,
    AboutModule,
    ReservationModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
