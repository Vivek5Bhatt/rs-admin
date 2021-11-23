import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddContactInfoComponent ,ContactInfoDetailsComponent } from './index';


const routes: Routes = [
  {
    path: '',
    data: { title: 'contact-info' },
    children: [
      {path: '', redirectTo: 'details', pathMatch: 'full'},
      { path: 'add', component: AddContactInfoComponent, data: { title: 'Add' } },
      { path: 'details', component: ContactInfoDetailsComponent, data: { title: 'details' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactInfoRoutingModule { }
