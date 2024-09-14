import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Contact } from '../value-object/contact';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ContactService } from '../service/contact.service';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Import for *ngIf
import { CommonModule } from '@angular/common';

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
export class ContactUpdateComponent {
  title = 'contact-update';

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
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

  updateContact(): void {
    const formValues = this.updateForm.value;
    const contact = new Contact(formValues.id, formValues.firstName, formValues.lastName, formValues.phoneNumber, formValues.email);

    if(this.updateForm.valid){
      this.contactService.updateContact(contact)
      .subscribe((data) => {
        alert(data ? 'Contact updated!':'Something went wrong!');
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

}
