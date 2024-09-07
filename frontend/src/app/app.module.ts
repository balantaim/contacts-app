import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
//import { LoginformComponent } from './loginform/loginform.component';
import { ContactsComponent } from './contacts/contacts.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideHttpClient } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactDeleteComponent } from './contact-delete/contact-delete.component';
import { ContactUpdateComponent } from './contact-update/contact-update.component';
import { AuthFailedComponent } from './auth-failed/auth-failed.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    //LoginformComponent,
    ContactAddComponent,
    ContactDeleteComponent,
    ContactUpdateComponent,
    AuthFailedComponent,
    PageNotFoundComponent,
    //ContactsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ContactsComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
