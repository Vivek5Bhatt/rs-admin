import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddGroupNameComponent, GroupNameListComponent, GroupNameDetailComponent, EditGroupNameComponent } from './index';

const routes: Routes = [
  {
    path: '',
    data: { title: 'Group Name' },
    children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      { path: 'add', component: AddGroupNameComponent, data: { title: 'Add' } },
      { path: 'list', component: GroupNameListComponent, data: { title: 'List' } },
      { path: 'detail/:groupId', component: GroupNameDetailComponent, data: { title: 'Detail' } },
      { path: 'edit/:groupId', component: EditGroupNameComponent, data: { title: 'Edit' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupNameRoutingModule { }
