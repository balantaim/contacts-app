import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { NGXLogger } from "ngx-logger";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private url: string | undefined;
  constructor(private http: HttpClient, 
    private logger: NGXLogger, 
    private toastr: ToastrService) {
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
        //Add two more retry if the first one failed
        retry(2),
        map(response => {
          let body = JSON.parse(JSON.stringify(response)).body;
          this.isLogged = body.isLoggedIn === true ? true:false;
          return this.isLogged;
        }),
        //Add error hadling
        catchError((error: HttpErrorResponse) => {
          this.logger.error('Error on call isAuthenticated: ', error.message || error.statusText);
          this.toastr.error('The service is unavaiable right now! Please try again later.');
          return throwError(() => error);
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
      );
  }

}