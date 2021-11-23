import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMeasurementUnitComponent, MeasurementUnitListComponent } from './index';

const routes: Routes = [
  {
    path: '',
    data: { title: 'Measurement unit' },
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'add', component: AddMeasurementUnitComponent, data: { title: 'Add measurement unit' } },
      { path: 'list', component: MeasurementUnitListComponent, data: { title: 'Measurement unit tist' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeasurementUnitRoutingModule { }
