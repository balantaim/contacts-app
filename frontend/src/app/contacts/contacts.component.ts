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
//Logger
import { NGXLogger } from "ngx-logger";

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

  constructor(private contactService: ContactService, 
    private toastr: ToastrService, 
    private sharedContact: SharedContactService,
    private logger: NGXLogger) { }

  findContactById(): void {
    if (this.idValue.value == '' || this.idValue.value == null) {
      this.logger.error('Invalid ID value!');
      this.toastr.error('Enter valid ID number!');
      return;
    }

    this.contactService.getContactById(this.idValue.value)
      .subscribe({
        next: (data) => {
          this.contactById = data;
        },
        error: (e) => {
          this.logger.error('Error: ' + e);
          this.toastr.error('The service is unavaiable!');
        }
      });
  }

  getAllContacts(): void {
    let filter = '';
    if (this.filterValue.value !== null &&
      this.filterValue.value !== undefined &&
      this.filterValue.value.length > 0) {
      filter = '/?filter=' + this.filterValue.value;
    }

    this.contactService.getContacts(filter)
      .subscribe({
        next: data => {
          this.contacts = data;
          if (data.length == 0 && filter.length > 0) {
            this.logger.info('No contacts.');
            this.toastr.info('There are no contacts with this keyword.');
          }
        },
        error: (e) => {
          this.logger.error('Error: ' + e);
          this.toastr.error('The service is unavaiable!');
        }
      });
  }

  haveErrorFieldId(): boolean {
    if (this.idValue.value == '' || this.idValue.value == null || Number.parseInt(this.idValue.value) < 1) {
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
