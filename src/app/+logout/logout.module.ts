import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router/';

import { LogoutComponent } from './logout.component';

import { UserService } from '../services/user.service';

const routes: Routes = [
  {
    path: '',
    component: LogoutComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LogoutComponent],
  providers: [UserService]

})
export class LogoutModule { }
