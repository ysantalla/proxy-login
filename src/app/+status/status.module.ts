import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router/';

import { StatusComponent } from './status.component';
import { UserService } from '../services/user.service';

const routes: Routes = [
  {
    path: '',
    component: StatusComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [StatusComponent],
  providers: [UserService]
})
export class StatusModule { }
