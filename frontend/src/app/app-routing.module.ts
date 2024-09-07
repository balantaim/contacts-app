import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginformComponent } from './loginform/loginform.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactUpdateComponent } from './contact-update/contact-update.component';
import { ContactDeleteComponent } from './contact-delete/contact-delete.component';
import { AuthFailedComponent } from './auth-failed/auth-failed.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  //Public routes
  {path: '', component:LoginformComponent}, //Login view
  {path: 'authFailed', component:AuthFailedComponent},
  {path: 'page-not-found', component:PageNotFoundComponent},
  //Secured routes
  {path: 'contacts', component:ContactsComponent, canActivate: [AuthGuard]},
  {path: 'add', component:ContactAddComponent, canActivate: [AuthGuard]},
  {path: 'update', component:ContactUpdateComponent, canActivate: [AuthGuard]},
  {path: 'delete', component:ContactDeleteComponent, canActivate: [AuthGuard]},
  //Default route
  { path: '**', redirectTo: 'page-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
