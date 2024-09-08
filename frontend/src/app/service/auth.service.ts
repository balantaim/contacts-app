import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private url: string | undefined;
  constructor(private http: HttpClient) {
    this.url = environment.apiUrl;
  }
  isLogged: boolean = false;

  // Login
  tryLogin(body: any) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(`${this.url}/login`,
      body,
      {
        headers, observe: 'response', withCredentials: true
      });
  }

  // Check if the user is authenticated
  isAuthenticated(): Observable<boolean> {
    return this.http.get<{ authenticated: boolean }>(`${this.url}/status/info`, { observe: 'response', withCredentials: true })
      .pipe(
        map(response => {
          let body = JSON.parse(JSON.stringify(response)).body;
          this.isLogged = body.isLoggedIn === true ? true:false;
          return this.isLogged
        })
      );
  }

  // Logout
  logout(): Observable<any>{
    return this.http
      .post<any>(
        `${this.url}/logout`, {},
        {
          observe: 'response', withCredentials: true
        }
      )
  }

}