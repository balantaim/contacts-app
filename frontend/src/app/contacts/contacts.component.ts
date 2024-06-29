import { Component, EventEmitter, Input, ViewChild, Output } from '@angular/core';

import { Contact } from './contact';
import { HttpClient } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgForm } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';



@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',

  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatInputModule, MatFormFieldModule, FormsModule, MatIconModule, MatDividerModule]
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsComponent {
  title = 'contacts';

  @Input() defaultContact: Contact = new Contact(0, '', '', '', '');

  contacts: Contact[] = [];

  constructor(private http: HttpClient){}

  findContactById(): void{
    this.http.get<Contact>(
      "http://localhost:5000/find/"
    ).subscribe(data => 
      //this.contacts = data
      console.log(data)
    );
  }

  searchWithFilter(filter: string): void{
    this.http.get<Contact[]>(
      "http://localhost:5000/?filter=" + filter
    ).subscribe(data => 
      //this.contacts = data
      console.log(data)
    );
  }

  getAllContacts(): void{
    this.http.get<Contact[]>(
      "http://localhost:5000"
    ).subscribe(data => 
      this.contacts = data
      //console.log(data)
    );
  }

    createContact(): void{
    this.http.post<Contact>(
      "http://localhost:5000/add/", this.contactsForm.value
    ).subscribe(data => 
      this.newDataEvent.emit(data)
    );
  }
  appendData(contact: any): void {
    this.contacts.push(contact);
  }
  

  // updateContact(): void{
  //   this.http.put<Contact>(
  //     "http://localhost:5000/update/", contact
  //   ).subscribe(data => 
  //     //this.contacts = data
  //     console.log(data)
  //   );
  // }

  deleteContact(): void{
    this.http.delete(
      "http://localhost:5000/delete/"
    ).subscribe(data => 
      //this.contacts = data
      console.log(data)
    );
  }

  ngOnInit(): void{
    console.log("contacts init!")

    this.http.get<Contact[]>(
      "http://localhost:5000"
    ).subscribe(data => 
      this.contacts = data
      //console.log(data)
    );
  }

  //video
  @ViewChild("contactsFrom") contactsForm!: NgForm;

  @Output() newDataEvent = new EventEmitter();


  
}
