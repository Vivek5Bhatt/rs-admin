import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDiscountComponent, DiscountListComponent, EditDiscountComponent } from './index';

const routes: Routes = [
  {
    path: '',
    data: { title: 'Discount' },
    children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      { path: 'add', component: AddDiscountComponent, data: { title: 'Add' } },
      { path: 'list', component: DiscountListComponent, data: { title: 'List' } },
      { path: 'edit/:discountId', component: EditDiscountComponent, data: { title: 'Edit' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscountRoutingModule { }
