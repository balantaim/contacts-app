import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginformComponent } from './loginform/loginform.component';
import { ContactsComponent } from './contacts/contacts.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideHttpClient } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactDeleteComponent } from './contact-delete/contact-delete.component';
import { ContactUpdateComponent } from './contact-update/contact-update.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginformComponent,
    ContactAddComponent,
    ContactDeleteComponent,
    ContactUpdateComponent,
    //ContactsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ContactsComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
