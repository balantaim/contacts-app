import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Import for *ngIf
import { CommonModule } from '@angular/common';
//Logger
import { NGXLogger } from "ngx-logger";
//Spinner
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
//import { CookieService } from 'ngx-cookie-service';

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
    private router: Router,
    private logger: NGXLogger,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    //private cookieService: CookieService,
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    });
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      //Show loading spinner
      this.spinner.show();
      const formValues = this.loginForm.value;

      const body = {
        username: formValues.username,
        password: formValues.password,
      };

      this.authService.tryLogin(body)
        .subscribe({
          next: (response) => {
            if (response.status === 200 && response.url !== "http://localhost:5000/login/authFailed") {
              this.logger.info('Success login!');
              this.router.navigate(['contacts']);
            } else {
              this.logger.error('Error: Authorisation failed!');
              this.router.navigate(['authFailed']);
            }
            //Hide loading spinner
            this.spinner.hide();
          },
          error: (e) => {
            this.logger.error('Error: ' + e);
            this.spinner.hide();
            this.toastr.error('Error: Web service is offline!');
          }
        });
    }
  }

}
