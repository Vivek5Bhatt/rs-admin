import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AddCategoryComponent, AddSubCategoryComponent, CategoryListComponent,
  CategoryDetailSubcategoryComponent, EditCategoryComponent, EditSubCategoryComponent
} from './index';

const routes: Routes = [
  {
    path: '',
    data: { title: 'Category' },
    children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      { path: 'add', component: AddCategoryComponent, data: { title: 'Add' } },
      { path: 'list', component: CategoryListComponent, data: { title: 'List' } },
      { path: 'add-sub', component: AddSubCategoryComponent, data: { title: 'Add Subcategory' } },
      { path: 'detail/:categoryId', component: CategoryDetailSubcategoryComponent, data: { title: 'Category Details With Subcategory List' } },
      { path: 'edit/:categoryId', component: EditCategoryComponent, data: { title: 'Edit' } },
      { path: 'edit/:categoryId/:subCategoryId', component: EditSubCategoryComponent, data: { title: 'Edit Sub Category' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
