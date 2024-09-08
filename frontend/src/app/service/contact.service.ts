import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Contact } from '../value-object/contact';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private url: string | undefined;
  constructor(private http: HttpClient) {
    this.url = environment.apiUrl;
  }
  // private url = 'http://localhost:5000';
 
  httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  // Get all contacts
  getContacts(filter: string): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.url + filter, {withCredentials: true});
  }
  // Get contact by ID
  getContactById(id: string): Observable<Contact> {
    const url = `${this.url}/find/${id}`;
    return this.http.get<Contact>(url, {withCredentials: true});
  }
  // Create a new contact
  createContact(contact: Contact): Observable<boolean> {
    return this.http.post<Contact>(`${this.url}/add`, contact, {
      observe: 'response', withCredentials: true
    })
    .pipe(
      map(() => true),
      catchError(this.handleError<boolean>('createContact', false))
    );
  }
  // Update an existing contact
  updateContact(contact: Contact): Observable<boolean> {
    const url = `${this.url}/update`;
    return this.http.put<Contact>(url, contact, {
      observe: 'response', withCredentials: true
    })
    .pipe(
      map(() => true),
      catchError(this.handleError<boolean>('updateContact', false))
    );
  }
  // Delete a contact
  deleteContact(id: number): Observable<boolean> {
    const url = `${this.url}/delete/${id}`;
    return this.http.delete<any>(url, {
      observe: 'response', withCredentials: true
    })
    .pipe(
      map(() => true),
      catchError(this.handleError<boolean>('deleteContact', false))
    );
  }

  // Error handling
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
