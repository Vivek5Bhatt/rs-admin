import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { AddApplicationComponent } from './add-application/add-application.component';
import { EditApplicationComponent } from './edit-application/edit-application.component';
import { ApplicationListComponent } from './application-list/application-list.component';
import { ApplicationDetailComponent } from './application-detail/application-detail.component';


@NgModule({
  declarations: [AddApplicationComponent, EditApplicationComponent, ApplicationListComponent, ApplicationDetailComponent],
  imports: [
    CommonModule,
    ApplicationRoutingModule
  ]
})
export class ApplicationModule { }
