import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth-failed',
  templateUrl: './auth-failed.component.html',
  styleUrl: './auth-failed.component.css',

  standalone: true,
})
export class AuthFailedComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
    this.toastr.error('Authentication failed!', 'Login process');
  }

}
