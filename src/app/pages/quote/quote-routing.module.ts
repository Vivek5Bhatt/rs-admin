import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuoteListComponent } from './index';

const routes: Routes = [
  {
    path: '',
    data: { title: 'Quote' },
    children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      { path: 'list', component: QuoteListComponent, data: { title: 'List' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuoteRoutingModule { }
