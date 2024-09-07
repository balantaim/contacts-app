import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact-delete',
  templateUrl: './contact-delete.component.html',
  styleUrl: './contact-delete.component.css'
})
export class ContactDeleteComponent {
  title = 'contact-delete';

  constructor(private http: HttpClient) { }

  idValue = new FormControl(0);

  deleteContact(): void {
    if(this.idValue.value == undefined || this.idValue.value == null || this.idValue.value === 0){
      alert('Invalid ID!');
      return;
    }
    this.http.delete(
      'http://localhost:5000/delete/' + this.idValue.value, 
      {observe: 'response', withCredentials: true}
    ).subscribe((data) => {
      if(data.ok){
        alert('Contact deleted!');
      }
    }, 
    (error) => {
      alert('Contact not found!');
    }
    );
  }

}
