import { Component, EventEmitter, Input, ViewChild, Output } from '@angular/core';

import { Contact } from '../value-object/contact';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';



@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',

  standalone: true,
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, FormsModule]
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsComponent {
  title = 'contacts';

  @Input() defaultContact: Contact = new Contact(0, '', '', '', '');

  contacts: Contact[] = [];

  constructor(private http: HttpClient) { }

  findContactById(): void {
    this.http.get<Contact>(
      "http://localhost:5000/find/", {withCredentials: true}
    ).subscribe(data =>
      //this.contacts = data
      console.log(data)
    );
  }

  searchWithFilter(filter: string): void {
    this.http.get<Contact[]>(
      `http://localhost:5000/?filter=${filter}`, {withCredentials: true}
    ).subscribe(data =>
      //this.contacts = data
      console.log(data)
    );
  }

  getAllContacts(): void {

    this.http.get<Contact[]>(
      "http://localhost:5000", {withCredentials: true}
    ).subscribe(data =>
      this.contacts = data
      //console.log(data)
    );
  }

  ngOnInit(): void {
    console.log("contacts init!")

    this.http.get<Contact[]>(
      "http://localhost:5000", {withCredentials: true}
    ).subscribe(data =>
      this.contacts = data
      //console.log(data)
    );
  }

  //video
  // @ViewChild("contactsFrom") contactsForm!: NgForm;

  // @Output() newDataEvent = new EventEmitter();



}
