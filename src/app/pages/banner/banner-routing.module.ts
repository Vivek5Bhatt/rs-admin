import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBannerComponent, BannerListComponent, BannerDetailsComponent } from './index';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Banner'
    },
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: "add", component: AddBannerComponent, data: { title: 'Add Banner' } },
      { path: "list", component: BannerListComponent, data: { title: 'Banner List' } },
      { path: "detail/:bannerId", component: BannerDetailsComponent, data: { title: 'Banner Details' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannerRoutingModule { }
