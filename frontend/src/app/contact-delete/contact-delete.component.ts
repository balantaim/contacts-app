import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contact-delete',
  templateUrl: './contact-delete.component.html',
  styleUrl: './contact-delete.component.css'
})
export class ContactDeleteComponent {

  constructor(private http: HttpClient) { }

  contactId: string = "1";

  deleteContact(): void {
    this.http.delete(
      `http://localhost:5000/delete/${this.contactId}`, {withCredentials: true}
    ).subscribe(data =>
      //this.contacts = data
      console.log(data)
    );
  }

}
