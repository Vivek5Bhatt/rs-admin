import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuoteRoutingModule } from './quote-routing.module';
import { QuoteListComponent } from './index';

@NgModule({
  declarations: [QuoteListComponent],
  imports: [
    CommonModule,
    QuoteRoutingModule
  ]
})
export class QuoteModule { }
