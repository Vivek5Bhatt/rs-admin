import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscountRoutingModule } from './discount-routing.module';
import { AddDiscountComponent, DiscountListComponent, EditDiscountComponent } from './index';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [AddDiscountComponent, DiscountListComponent, EditDiscountComponent],
  imports: [
    CommonModule,
    DiscountRoutingModule,
    ReactiveFormsModule,
    NgxDropzoneModule
  ]
})
export class DiscountModule { }
