import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestRoutingModule } from './request-routing.module';
import { RequestListComponent } from './request-list/request-list.component';
import { RequestDetailComponent } from './request-detail/request-detail.component';


@NgModule({
  declarations: [RequestListComponent, RequestDetailComponent],
  imports: [
    CommonModule,
    RequestRoutingModule
  ]
})
export class RequestModule { }
