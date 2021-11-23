import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareerRoutingModule } from './career-routing.module';
import { CareerListComponent } from './career-list/career-list.component';
import { CareerDetailComponent } from './career-detail/career-detail.component';


@NgModule({
  declarations: [CareerListComponent, CareerDetailComponent],
  imports: [
    CommonModule,
    CareerRoutingModule
  ]
})
export class CareerModule { }
