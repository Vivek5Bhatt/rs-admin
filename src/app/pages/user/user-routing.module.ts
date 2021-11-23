import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent, UserDetailsComponent } from './index';

const routes: Routes = [
  {
    path: '',
    data: { title: 'User' },
    children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      { path: 'list', component: UserListComponent, data: { title: 'List' } },
      { path: 'detail/:userId', component: UserDetailsComponent, data: { title: 'Details' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
