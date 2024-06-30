import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginformComponent } from './loginform/loginform.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactUpdateComponent } from './contact-update/contact-update.component';
import { ContactDeleteComponent } from './contact-delete/contact-delete.component';

const routes: Routes = [
  {path: '', component:LoginformComponent},
  {path: 'contacts', component:ContactsComponent},
  {path: 'add', component:ContactAddComponent},
  {path: 'update', component:ContactUpdateComponent},
  {path: 'delete', component:ContactDeleteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
