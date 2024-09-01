import { Injectable, inject, signal } from '@angular/core';
import { UserService } from './user.service';
//import { UserInterface } from './user.interface';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  //currentUserSig = signal<UserInterface | undefined | null>(undefined);
  
  // userService: UserService = inject(UserService);

  // isLogged: Boolean = false;

  // login(username: string, pass: string){

    
  // }

  // logout(){
  //   this.isLogged = false;
  // }
  // isAuthenticated(){
  //   return this.isLogged;
  // }

}