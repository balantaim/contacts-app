import { Component } from '@angular/core';
import { Contact } from '../value-object/contact';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrl: './contact-update.component.css'
})
export class ContactUpdateComponent {
  title = 'contact-update';

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.updateForm = this.fb.group({
      id: [0, Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  updateForm: FormGroup;

  updateContact(): void {
    const formValues = this.updateForm.value;
    const contact = new Contact(formValues.id, formValues.firstName, formValues.lastName, formValues.phoneNumber, formValues.email);

    this.contactService.updateContact(contact)
      .subscribe((data) => {
        alert(data ? 'Contact updated!':'Something went wrong!');
      });

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
