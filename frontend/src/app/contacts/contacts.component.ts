import { Component } from '@angular/core';

import { Contact } from '../value-object/contact';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
//Import for *ngIf
import { CommonModule } from '@angular/common';
import { ContactService } from '../service/contact.service';
import { ToastrService } from 'ngx-toastr';
import { SharedContactService } from '../shared/shared-contact.service';
//import { NgForm } from '@angular/forms';
//import { MatIconModule } from '@angular/material/icon';
//import { MatDividerModule } from '@angular/material/divider';
//import { Component, EventEmitter, Input, ViewChild, Output } from '@angular/core';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',

  standalone: true,
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, CommonModule, MatButtonModule]
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsComponent {
  title = 'contacts';

  contacts: Contact[] = [];

  contactById: Contact = new Contact(0, '', '', '', '');

  filterValue = new FormControl('');
  idValue = new FormControl('');

  constructor(private contactService: ContactService, private toastr: ToastrService, private sharedContact: SharedContactService) { }

  findContactById(): void {
    if (this.idValue.value == '' || this.idValue.value == null) {
      this.toastr.error('Enter valid ID number!');
      return;
    }

    this.contactService.getContactById(this.idValue.value)
      .subscribe((data) => {
        this.contactById = data;
        //console.log(data)
      });

    // this.http.get<Contact>(
    //   "http://localhost:5000/find/" + this.idValue.value,
    //   { withCredentials: true }
    // ).subscribe((data) => {
    //   this.contactById = data;
    //   console.log(data)
    // },
    //   (error) => {
    //     alert('Contact not found!');
    //     this.contactById = new Contact(0, '', '', '', '');
    //   }
    // );
  }

  getAllContacts(): void {
    let filter = '';
    if (this.filterValue.value !== null &&
      this.filterValue.value !== undefined &&
      this.filterValue.value.length > 0) {
      filter = '/?filter=' + this.filterValue.value;
    }

    this.contactService.getContacts(filter)
      .subscribe(data => {
        this.contacts = data;
        if(data.length == 0 && filter.length > 0){
          this.toastr.info('There are no contacts with this keyword');
        }
        //console.log(data)
      });

    // let url: string = 'http://localhost:5000';

    // if(this.filterValue.value !== null && 
    //   this.filterValue.value !== undefined && 
    //   this.filterValue.value.length > 0){
    //   url = url + '/?filter=' + this.filterValue.value;
    // }

    // this.http.get<Contact[]>(
    //   url, 
    //   {withCredentials: true}
    // ).subscribe(data =>
    //   this.contacts = data
    //   //console.log(data)
    // );
  }

  haveErrorFieldId(): boolean{
    if(this.idValue.value == '' || this.idValue.value == null || Number.parseInt(this.idValue.value) < 1){
      return true;
    }
    return false;
  }

  copyContact(index: number): void {
    this.sharedContact.setContact(this.contacts[index]);
    this.toastr.info(`Contact with ID ${this.contacts[index].id} copied!`);
  }

  copyContactById(): void {
    this.sharedContact.setContact(this.contactById);
    this.toastr.info(`Contact with ID ${this.contactById.id} copied!`);
  }

}
