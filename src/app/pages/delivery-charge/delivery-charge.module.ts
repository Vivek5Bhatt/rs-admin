import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryChargeRoutingModule } from './delivery-charge-routing.module';
import { AddDeliveryChargeComponent, DeliveryChargeDetailsComponent, EditDeliveryChargeComponent } from './index';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AddDeliveryChargeComponent, DeliveryChargeDetailsComponent, EditDeliveryChargeComponent],
  imports: [
    CommonModule,
    DeliveryChargeRoutingModule,
    ReactiveFormsModule
  ]
})
export class DeliveryChargeModule { }
