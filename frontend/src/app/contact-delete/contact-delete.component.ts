import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ContactService } from '../service/contact.service';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Import for *ngIf
import { CommonModule } from '@angular/common';


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
export class ContactDeleteComponent {
  title = 'contact-delete';

  constructor(private contactService: ContactService) {}

  idValue = new FormControl(0);

  isValidInput(): boolean{
    if(this.idValue.value == undefined || this.idValue.value == null || this.idValue.value < 1){
      return false
    }
    return true;
  }

  deleteContact(): void {
    if(this.idValue.value == undefined || this.idValue.value == null || this.idValue.value === 0){
      alert('Invalid ID!');
      return;
    }

    this.contactService.deleteContact(this.idValue.value)
    .subscribe((data) => {
      alert(data ? 'Contact deleted!':'Something went wrong!');
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
