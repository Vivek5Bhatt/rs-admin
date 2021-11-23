import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDeliveryChargeComponent, DeliveryChargeDetailsComponent, EditDeliveryChargeComponent } from './index';

const routes: Routes = [
  {
    path: '',
    data: { title: 'Delivery Charge' },
    children: [
      {path: '', redirectTo: 'detail', pathMatch: 'full'},
      { path: 'add', component: AddDeliveryChargeComponent, data: { title: 'Add' } },
      { path: 'detail', component: DeliveryChargeDetailsComponent, data: { title: 'Details' } },
      { path: 'edit', component: EditDeliveryChargeComponent, data: { title: 'Edit' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryChargeRoutingModule { }
