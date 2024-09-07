import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
//Import for *ngIf
//import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router){}

  getAuthenticatedStatus(): boolean{
    return this.authService.isLogged;
  }

  userExit(): void{
    this.authService.logout()
    .subscribe((response) => {
      console.log(response);
      if (response.ok) {
        //alert('You are loged out!');
        this.authService.isLogged = false;
        this.router.navigate(['']);
      } else {
        //alert('Someting goes wrong!');
      }
    });
  }
}
