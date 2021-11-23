import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerRoutingModule } from './banner-routing.module';
import { AddBannerComponent, BannerListComponent, BannerDetailsComponent } from './index';
import { ReactiveFormsModule } from "@angular/forms";
import { NgxDropzoneModule } from 'ngx-dropzone';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [AddBannerComponent, BannerListComponent, BannerDetailsComponent],
  imports: [
    CommonModule,
    BannerRoutingModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ]
})
export class BannerModule { }
