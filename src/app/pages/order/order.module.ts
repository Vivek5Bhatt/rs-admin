import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent, OrderDetailsComponent } from './index';
import { RefundOrderComponent } from './refund-order/refund-order.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [OrderListComponent, OrderDetailsComponent, RefundOrderComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ModalModule.forRoot()
  ]
})
export class OrderModule { }
