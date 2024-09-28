import { Injectable } from '@angular/core';
import { Contact } from '../value-object/contact';

@Injectable({
  providedIn: 'root'
})
export class SharedContactService {
  constructor() { }
  sharedContact: Contact = new Contact(0, '', '', '', '');

  setContact(newContact: Contact) {
    this.sharedContact.id = newContact.id;
    this.sharedContact.firstName = newContact.firstName;
    this.sharedContact.lastName = newContact.lastName;
    this.sharedContact.phoneNumber = newContact.phoneNumber;
    this.sharedContact.email = newContact.email;
  }

  getContactId(): number {
    if(this.sharedContact.id){
      return this.sharedContact.id;
    }
    return -1;
  }

  getContactFirstName(): string {
    return this.sharedContact.firstName;
  }

  getContactLastName(): string {
    return this.sharedContact.lastName;
  }

  getContactPhoneNumber(): string {
    return this.sharedContact.phoneNumber;
  }

  getContactEmail(): string {
    return this.sharedContact.email;
  }

  resetContact(): void {
    this.sharedContact = new Contact(0, '', '', '', '');
  }

}
