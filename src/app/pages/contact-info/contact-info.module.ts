import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactInfoRoutingModule } from './contact-info-routing.module';
import { AddContactInfoComponent ,ContactInfoDetailsComponent } from './index';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddContactInfoComponent, ContactInfoDetailsComponent],
  imports: [
    CommonModule,
    ContactInfoRoutingModule,
    ReactiveFormsModule
  ]
})
export class ContactInfoModule { }
