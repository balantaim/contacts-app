import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserInterface } from '../user.interface';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.css',

  // standalone: true,
  // imports: [ReactiveFormsModule],
})

export class LoginformComponent {
  title = 'login';

  constructor(private http: HttpClient){}

  // fb = inject(FormBuilder);
  // http = inject(HttpClient);
   authService = inject(AuthService);
  // router = inject(Router);

  // form = this.fb.nonNullable.group({
  //   username: ['', Validators.required],
  //   password: ['', Validators.required],
  // });

  onSubmit(): void {
    


    this.http
      .post<{ user: UserInterface }>(
        'http://localhost:5000/login',
        {
          username: "user",
          password: "pass",
          session: ""
        }
      )
      .subscribe((response) => {
        //console.log('response', response);
        console.log(response);
        localStorage.setItem('SESSION', response.user.session);
        this.authService.currentUserSig.set(response.user);
        // this.router.navigateByUrl('/');
      });
  }

  ngOnInit(): void{

    const user: UserInterface = {"username" : "user", "password" : "pass", "session" : ""};


    this.http
      .post<{ user: UserInterface }>(
        'http://localhost:5000/login',
        {
          username: "user",
          password: "pass",
          session: ""
        }
      )
      .subscribe((response) => {
        //console.log('response', response);
        //console.log(response);
         localStorage.setItem('SESSION', response.user.session);
         this.authService.currentUserSig.set(response.user);
         //this.router.navigateByUrl('/');
      });
    
  }
}
