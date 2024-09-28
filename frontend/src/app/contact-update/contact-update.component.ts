import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Contact } from '../value-object/contact';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ContactService } from '../service/contact.service';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedContactService } from '../shared/shared-contact.service';
//Import for *ngIf
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrl: './contact-update.component.css',

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
export class ContactUpdateComponent implements OnInit {
  title = 'contact-update';

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private toastr: ToastrService,
    private sharedContact: SharedContactService,
  ) {
    this.updateForm = this.fb.group({
      id: [0, Validators.required],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  updateForm: FormGroup;

  ngOnInit(): void {
    if(this.sharedContact.getContactId() >= 1){
      this.updateForm.controls['id'].setValue(this.sharedContact.getContactId());
    }
    this.updateForm.controls['firstName'].setValue(this.sharedContact.getContactFirstName());
    this.updateForm.controls['lastName'].setValue(this.sharedContact.getContactLastName());
    this.updateForm.controls['phoneNumber'].setValue(this.sharedContact.getContactPhoneNumber());
    this.updateForm.controls['email'].setValue(this.sharedContact.getContactEmail());
  }

  updateContact(): void {
    const formValues = this.updateForm.value;
    const contact = new Contact(formValues.id, formValues.firstName, formValues.lastName, formValues.phoneNumber, formValues.email);

    if(this.updateForm.valid){
      this.contactService.updateContact(contact)
      .subscribe((data) => {
        if(data){
          this.toastr.success('Contact updated!');
        }else{
          this.toastr.error('Contact with current ID not found!');
        }
      });
    }

    // this.http.put<any>(
    //   "http://localhost:5000/update", 
    //   contact,
    //   {
    //     observe: 'response', withCredentials: true
    //   }
    // ).subscribe((data) => {
    //   //this.contacts = data
    //   console.log(data);
    //   alert('Contact updated!');
    // },
    // (error) => {
    //   alert('Invalid data');
    // });
  }

  clearData(){
    this.updateForm.get('firstName')?.reset();
    this.updateForm.get('lastName')?.reset();
    this.updateForm.get('phoneNumber')?.reset();
    this.updateForm.get('email')?.reset();
    this.sharedContact.resetContact();
  }

}
