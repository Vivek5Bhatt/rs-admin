import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/alert/alert.component';
import { RootComponent } from './components/root/root.component';

@NgModule({
  declarations: [AlertComponent, RootComponent],
  imports: [
    CommonModule
  ],
  exports: [AlertComponent]
})
export class SharedModule { }
