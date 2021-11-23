import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsRoutingModule } from './brands-routing.module';
import { AddBrandComponent , BrandsListComponent } from './index';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddBrandComponent, BrandsListComponent],
  imports: [
    CommonModule,
    BrandsRoutingModule,
    ReactiveFormsModule
  ]
})
export class BrandsModule { }
