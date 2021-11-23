import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupNameRoutingModule } from './group-name-routing.module';
import { AddGroupNameComponent, GroupNameListComponent, GroupNameDetailComponent, EditGroupNameComponent } from './index';
import { ReactiveFormsModule } from "@angular/forms";
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [AddGroupNameComponent, GroupNameListComponent, GroupNameDetailComponent, EditGroupNameComponent],
  imports: [
    CommonModule,
    GroupNameRoutingModule,
    ReactiveFormsModule,
    NgxDropzoneModule
  ]
})
export class GroupNameModule { }
