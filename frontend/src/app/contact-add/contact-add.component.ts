import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../value-object/contact';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrl: './contact-add.component.css'
})
export class ContactAddComponent {

  constructor(
    private http: HttpClient,
    private fb: FormBuilder, 
  ) {
    this.addForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  addForm: FormGroup;

  createContact(): void {

    //Create new contact
    const formValues = this.addForm.value;
    const contact = new Contact(0, formValues.firstName, formValues.lastName, formValues.phoneNumber, formValues.email);

    this.http.post<any>(
      "http://localhost:5000/add", contact,
      {
        observe: 'response', withCredentials: true
      }
    ).subscribe(data =>
      {
        if(data.ok){
          alert('Contact created!');
        }
      },
      (error) => {
        alert('Invalid data!');
      }
    );

  }

}
