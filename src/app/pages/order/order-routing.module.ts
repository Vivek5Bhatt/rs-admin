import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent, OrderDetailsComponent,RefundOrderComponent } from './index';

const routes: Routes = [
  {
    path: '',
    data: { title: 'Order' },
    children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      { path: 'list', component: OrderListComponent, data: { title: 'List' } },
      { path: 'detail/:orderId', component: OrderDetailsComponent, data: { title: 'Details' } },
      {
        path:"refund",component:RefundOrderComponent,data:{title:"Refund Order"}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
