import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBrandComponent , BrandsListComponent } from './index';

const routes: Routes = [
  {
    path: '',
    data: { title: 'Brand' },
    children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      { path: 'add', component: AddBrandComponent, data: { title: 'Add' } },
      { path: 'list', component: BrandsListComponent, data: { title: 'List' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandsRoutingModule { }
