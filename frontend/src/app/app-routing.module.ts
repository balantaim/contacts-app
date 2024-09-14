import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  //Public routes
  {path: '', loadComponent: () => import('./loginform/loginform.component').then((m) => m.LoginformComponent)}, //Login view + Lazy loading
  //{path: 'authFailed', component:AuthFailedComponent}, //Component without lazy loading
  {path: 'authFailed', loadComponent: () => import('./auth-failed/auth-failed.component').then((m) => m.AuthFailedComponent)},
  {path: 'page-not-found', loadComponent: () => import('./page-not-found/page-not-found.component').then((m) => m.PageNotFoundComponent)},
  //Secured routes
  {path: 'contacts', loadComponent: () => import('./contacts/contacts.component').then((m) => m.ContactsComponent), canActivate: [AuthGuard]},
  {path: 'add', loadComponent: () => import('./contact-add/contact-add.component').then((m) => m.ContactAddComponent), canActivate: [AuthGuard]},
  {path: 'update', loadComponent: () => import('./contact-update/contact-update.component').then((m) => m.ContactUpdateComponent), canActivate: [AuthGuard]},
  {path: 'delete', loadComponent: () => import('./contact-delete/contact-delete.component').then((m) => m.ContactDeleteComponent), canActivate: [AuthGuard]},
  //Default route
  { path: '**', redirectTo: 'page-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
