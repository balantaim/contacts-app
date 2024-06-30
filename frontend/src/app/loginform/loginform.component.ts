import { Component } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';
// import { Router } from '@angular/router';
// import { UserInterface } from '../user.interface';
// import { tap } from 'rxjs';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.css',

  //standalone: true,
  //imports: [MatIconModule, MatDividerModule, MatButtonModule],
})

export class LoginformComponent {
  title = 'login';

  loginForm: FormGroup;

  constructor(
    private http: HttpClient, 
    private authService: AuthService, 
    private fb: FormBuilder, 
    private cookieService: CookieService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // router = inject(Router);

  onSubmit(): void {
    const formValues = this.loginForm.value;

    const body = {
      username: formValues.username,
      password: formValues.password,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http
      .post<any>(
        'http://localhost:5000/login',
        body,
        {
          headers, observe: 'response', withCredentials: true
        }
      )
      .subscribe((response) => {
        console.log(response.url);
        if (response.url !== "http://localhost:5000/login/authFailed") {
          alert('Authentication Success!')
        }else{
          alert('Authentication failed!')
        }
      }, (error) => {alert('Authentication failed!')}
      );

  }

  getStatus(): void {
    this.http
    .get<any>(
      'http://localhost:5000/status/info',
      {
        observe: 'response', withCredentials: true
      }
    )
    .subscribe((response) => {
      let body = JSON.parse(JSON.stringify(response)).body;
      console.log(body);
      if (response.ok) {
        alert('You are logged!')
      } else {
        alert('You are not authenticated!')
      }
    });

  }

  logout(): void {
    this.http
      .post<any>(
        'http://localhost:5000/logout', {},
        {
          observe: 'response', withCredentials: true
        }
      )
      .subscribe((response) => {
        console.log(response);
        if (response.ok) {
          alert('You are loged out!')
        } else {
          alert('Someting goes wrong!')
        }
      });
      //Delete session from the cookies
      this.deleteCookie('SESSION');
  }

  deleteCookie(cookieName: string) {
    //Delete single cookie by name
    this.cookieService.delete(cookieName);
    //Delete all cookies
    //this.cookieService.deleteAll();
  }

  ngOnInit(): void {
    //this.onSubmit();
  }

}
