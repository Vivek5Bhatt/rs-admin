import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent, ProductDetailComponent } from './index';

const routes: Routes = [
  {
    path: '',
    data: { title: 'Product' },
    children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      { path: 'list', component: ProductListComponent, data: { title: 'List' } },
      { path: 'detail/:productId', component: ProductDetailComponent, data: { title: 'Details' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
