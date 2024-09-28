import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ContactService } from '../service/contact.service';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedContactService } from '../shared/shared-contact.service';
//Import for *ngIf
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-delete',
  templateUrl: './contact-delete.component.html',
  styleUrl: './contact-delete.component.css',

  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactDeleteComponent implements OnInit {
  title = 'contact-delete';

  constructor(private contactService: ContactService, private toastr: ToastrService, private sharedContact: SharedContactService) { }

  idValue = new FormControl(0);

  ngOnInit(): void {
    if(this.sharedContact.getContactId() >= 1){
      this.idValue.setValue(this.sharedContact.getContactId());
    }
  }

  isValidInput(): boolean {
    if (this.idValue.value == undefined || this.idValue.value == null || this.idValue.value < 1) {
      return false;
    }
    return true;
  }

  deleteContact(): void {
    if (this.idValue.value == undefined || this.idValue.value == null || this.idValue.value == 0) {
      this.toastr.error('Invalid ID!');
      return;
    }

    this.contactService.deleteContact(this.idValue.value)
      .subscribe((data) => {
        if (data) {
          this.toastr.success('Contact deleted!');
        } else {
          this.toastr.error('No contact with current ID!');
        }
      });

    // this.http.delete(
    //   'http://localhost:5000/delete/' + this.idValue.value, 
    //   {observe: 'response', withCredentials: true}
    // ).subscribe((data) => {
    //   if(data.ok){
    //     alert('Contact deleted!');
    //   }
    // }, 
    // (error) => {
    //   alert('Contact not found!');
    // }
    // );
  }

}
