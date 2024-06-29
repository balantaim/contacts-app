import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginformComponent } from './loginform/loginform.component';
import { ContactsComponent } from './contacts/contacts.component';

const routes: Routes = [
  {path: '', component:LoginformComponent},
  {path: 'contacts', component:ContactsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
