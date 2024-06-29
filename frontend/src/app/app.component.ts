//import { Component } from '@angular/core';

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { UserInterface } from './user.interface';

import {Contact} from './contacts/contact';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'contacts-app';

  // contacts: Contact[] = [];

  // constructor(private http: HttpClient){}

  // ngOnInit(): void{
  //   this.http.get<Contact[]>(
  //     "http://localhost:5000"
  //   ).subscribe(data => this.contacts = data);
    
  // }

}
