import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

import { HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
//import { CookieService } from 'ngx-cookie-service';
//import { tap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Import for *ngIf
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.css',

  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LoginformComponent {
  title = 'login';

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    //private cookieService: CookieService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    });
  }

  // get username() {
  //   return this.loginForm.get('username');
  // }
  // get password() {
  //   return this.loginForm.get('password');
  // }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit(): void {
    if(this.loginForm.valid){
      const formValues = this.loginForm.value;

    const body = {
      username: formValues.username,
      password: formValues.password,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.authService.tryLogin(body, headers)
      .subscribe((response) => {
        if(response != null){
          console.log(response.url);
          if (response.status === 200 && response.url !== "http://localhost:5000/login/authFailed") {
            //alert('Authentication Success!');
            this.router.navigate(['contacts']);
          } else {
            this.router.navigate(['authFailed']);
          }
        }
      });
    }

  }

  // logout(): void {
  //   //Delete session from the cookies
  //   //this.deleteCookie('SESSION');
  // }

  // deleteCookie(cookieName: string) {
  //   //Delete single cookie by name
  //   if (this.cookieService.get(cookieName)) {
  //     //Delete all cookies
  //     //this.cookieService.deleteAll();
  //     this.cookieService.delete(cookieName);
  //   }
  // }

  // ngOnInit(): void {
  //   //this.onSubmit();
  // }

}
