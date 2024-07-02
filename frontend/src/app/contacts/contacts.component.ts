import { Component } from '@angular/core';

import { Contact } from '../value-object/contact';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
//import { NgForm } from '@angular/forms';
//import { MatButtonModule } from '@angular/material/button';
//import { MatIconModule } from '@angular/material/icon';
//import { MatDividerModule } from '@angular/material/divider';
//import { Component, EventEmitter, Input, ViewChild, Output } from '@angular/core';



@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',

  standalone: true,
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule]
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsComponent {
  title = 'contacts';

  //@Input() defaultContact: Contact = new Contact(0, '', '', '', '');

  contacts: Contact[] = [];

  contactById: Contact = new Contact(0, '', '', '', '');

  filterValue = new FormControl('');
  idValue = new FormControl('');

  constructor(private http: HttpClient) { }

  findContactById(): void {
    if(this.idValue.value == '' || this.idValue.value == null){
      alert('Enter valid ID number!');
      return;
    }

    this.http.get<Contact>(
      "http://localhost:5000/find/" + this.idValue.value, 
      { withCredentials: true}
    ).subscribe((data) => {
      this.contactById = data;
      console.log(data)
    },
    (error) => {
      alert('Contact not found!');
      this.contactById = new Contact(0, '', '', '', '');
    }
    );
  }

  getAllContacts(): void{
    let url: string = 'http://localhost:5000';

    if(this.filterValue.value !== null && 
      this.filterValue.value !== undefined && 
      this.filterValue.value.length > 0){
      url = url + '/?filter=' + this.filterValue.value;
    }

    this.http.get<Contact[]>(
      url, 
      {withCredentials: true}
    ).subscribe(data =>
      this.contacts = data
      //console.log(data)
    );
  }

  // @ViewChild("contactsFrom") contactsForm!: NgForm;

  // @Output() newDataEvent = new EventEmitter();

}
