import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent, UserDetailsComponent } from './index';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [UserListComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    UserRoutingModule
  ]
})
export class UserModule { }
