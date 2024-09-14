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
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrl: './contact-add.component.css',

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
export class ContactAddComponent {

  constructor(
    private contactService: ContactService,
    private fb: FormBuilder, 
  ) {
    this.addForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  addForm: FormGroup;

  createContact(): void {

    //Create new contact
    const formValues = this.addForm.value;
    const contact = new Contact(0, formValues.firstName, formValues.lastName, formValues.phoneNumber, formValues.email);

    if(this.addForm.valid){
      this.contactService.createContact(contact)
      .subscribe(data => {
        alert(data ? 'Contact created!':'Something went wrong!')
      });
    }


    // this.http.post<any>(
    //   "http://localhost:5000/add", contact,
    //   {
    //     observe: 'response', withCredentials: true
    //   }
    // ).subscribe(data =>
    //   {
    //     if(data.ok){
    //       alert('Contact created!');
    //     }
    //   },
    //   (error) => {
    //     alert('Invalid data!');
    //   }
    // );
  }

}
