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
//Logger
import { NGXLogger } from "ngx-logger";

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
export class ContactAddComponent implements OnInit {
  title = 'contact-add';

  constructor(
    private contactService: ContactService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private sharedContact: SharedContactService,
    private logger: NGXLogger,
  ) {
    this.addForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  addForm: FormGroup;

  ngOnInit(): void {
    this.addForm.controls['firstName'].setValue(this.sharedContact.getContactFirstName());
    this.addForm.controls['lastName'].setValue(this.sharedContact.getContactLastName());
    this.addForm.controls['phoneNumber'].setValue(this.sharedContact.getContactPhoneNumber());
    this.addForm.controls['email'].setValue(this.sharedContact.getContactEmail());
  }

  createContact(): void {

    //Create new contact
    const formValues = this.addForm.value;
    const contact = new Contact(0, formValues.firstName, formValues.lastName, formValues.phoneNumber, formValues.email);

    if (this.addForm.valid) {
      this.contactService.createContact(contact)
        .subscribe({
          next: (data) => {
            if (data) {
              this.logger.info('Success create!');
              this.toastr.success('Contact created!');
            } else {
              this.logger.error('Error: invalid input data!');
              this.toastr.error('Invalid input data!');
            }
          },
          error: (e) => {
            this.logger.info('Error: ' + e);
            this.toastr.error('The service is unavaiable! Please try again later');
          }
        });
    }
  }

  clearData() {
    this.addForm.get('firstName')?.reset();
    this.addForm.get('lastName')?.reset();
    this.addForm.get('phoneNumber')?.reset();
    this.addForm.get('email')?.reset();
    this.sharedContact.resetContact();
  }

}
