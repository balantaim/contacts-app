import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  constructor(private http: HttpClient) {}
  isLogged: boolean = false;

  tryLogin(body: any,headers: any) {
    return this.http.post<any>('http://localhost:5000/login',
      body,
      {
        headers, observe: 'response', withCredentials: true
      });
  }

  // Check if the user is authenticated
  isAuthenticated(): Observable<boolean> {
    return this.http.get<{ authenticated: boolean }>('http://localhost:5000/status/info', { observe: 'response', withCredentials: true })
      .pipe(
        map(response => {
          let body = JSON.parse(JSON.stringify(response)).body;
          this.isLogged = body.isLoggedIn === true ? true:false;
          return this.isLogged
        })
      );
  }

  logout(): Observable<any>{
    return this.http
      .post<any>(
        'http://localhost:5000/logout', {},
        {
          observe: 'response', withCredentials: true
        }
      )
  }

}