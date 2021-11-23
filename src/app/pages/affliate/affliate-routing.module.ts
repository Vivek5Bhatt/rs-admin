import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AffliateListComponent, AffliateContentComponent, AddWalletComponent } from './index';

const routes: Routes = [
  {
    path: '',
    data: { title: 'Affiliate' },
    children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      { path: 'list', component: AffliateListComponent, data: { title: 'List' } },
      { path: 'content', component: AffliateContentComponent, data: { title: 'Content' } },
      { path: "wallet/:userId", component: AddWalletComponent, data: { title: 'wallet' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AffliateRoutingModule { }
