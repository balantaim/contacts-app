import { Component } from '@angular/core';
//Spinner
import { NgxSpinnerService } from "ngx-spinner";
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ContactsApp';

  //Create default loading animation between routes
  constructor(private spinner: NgxSpinnerService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.spinner.show(); // Show the spinner on navigation start
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.spinner.hide(); // Hide the spinner on navigation end or error
      }
    });
  }

  // ngOnInit(): void{

  // }

}
