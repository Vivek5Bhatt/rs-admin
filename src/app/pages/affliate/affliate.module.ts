import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AffliateRoutingModule } from './affliate-routing.module';
import { AffliateListComponent, AffliateContentComponent, AddWalletComponent } from './index';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [AffliateListComponent, AffliateContentComponent, AddWalletComponent],
  imports: [
    CommonModule,
    AffliateRoutingModule,
    ReactiveFormsModule,
    CKEditorModule
  ]
})
export class AffliateModule { }
