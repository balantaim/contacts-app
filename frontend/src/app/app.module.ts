import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// For logger
import { LoggerModule } from "ngx-logger";
import { environment } from '../environments/environment';
// Spinner
import { NgxSpinnerModule } from "ngx-spinner";
// import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module for Toastr
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      progressBar: true,
      progressAnimation: 'increasing',
    }),
    LoggerModule.forRoot(environment.logging),
    NgxSpinnerModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
    //CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }