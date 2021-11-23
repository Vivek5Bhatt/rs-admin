import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorListComponent, VendorDetailsComponent } from './index';

const routes: Routes = [
  {
    path: '',
    data: { title: 'Vendor' },
    children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      { path: 'list', component: VendorListComponent, data: { title: 'List' } },
      { path: 'detail/:vendorId', component: VendorDetailsComponent, data: { title: 'Details' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
