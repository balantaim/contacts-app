import { Component, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../value-object/contact';

@Component({
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrl: './contact-update.component.css'
})
export class ContactUpdateComponent {

  constructor(private http: HttpClient) { }

  @Input() defaultContact: Contact = new Contact(0, '', '', '', '');

  updateContact(): void {
    this.http.put<any>(
      "http://localhost:5000/update/", 
      this.defaultContact,
      {
        observe: 'response', withCredentials: true
      }
    ).subscribe(data =>
      //this.contacts = data
      console.log(data)
    );
  }

}
