import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import {
  AddCategoryComponent, AddSubCategoryComponent, CategoryListComponent,
  CategoryDetailSubcategoryComponent, EditCategoryComponent, EditSubCategoryComponent
} from './index';
import { ReactiveFormsModule } from "@angular/forms";
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [AddCategoryComponent, AddSubCategoryComponent, CategoryListComponent, CategoryDetailSubcategoryComponent, EditCategoryComponent, EditSubCategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ReactiveFormsModule,
    NgxDropzoneModule
  ]
})
export class CategoryModule { }
