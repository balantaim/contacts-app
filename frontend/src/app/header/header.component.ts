import { Component, Renderer2, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
//Import for *ngIf
//import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  private isDarkTheme = false;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService, private renderer: Renderer2) { }

  ngOnInit(): void {
    const theme = localStorage.getItem('theme');
    this.isDarkTheme = theme === 'dark';
    this.updateTheme();
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    this.updateTheme();
  }

  updateTheme(): void {
    const themeClass = this.isDarkTheme ? 'dark-theme' : 'light-theme';
    // Gets the <html> element
    const htmlElement = document.documentElement;
    this.renderer.setAttribute(htmlElement, 'class', themeClass);
  }

  getAuthenticatedStatus(): boolean {
    return this.authService.isLogged;
  }

  userExit(): void {
    this.authService.logout()
      .subscribe({
        next: (response) => {
          console.log(response);
          if (response.ok) {
            this.authService.isLogged = false;
            this.router.navigate(['']);
          } else {
            this.toastr.error('Someting goes wrong!');
          }
        },
        error: (e) => {
          this.toastr.error('The service is unavaiable!');
        }
      });
  }

}
