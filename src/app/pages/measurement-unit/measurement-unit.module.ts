import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeasurementUnitRoutingModule } from './measurement-unit-routing.module';
import { AddMeasurementUnitComponent, MeasurementUnitListComponent } from './index';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


@NgModule({
  declarations: [AddMeasurementUnitComponent, MeasurementUnitListComponent],
  imports: [
    CommonModule,
    MeasurementUnitRoutingModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
  ]
})
export class MeasurementUnitModule { }
