import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router/';

import { StatusComponent } from './status.component';
import { UserService } from '../services/user.service';

import {
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule} from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: StatusComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    RouterModule.forChild(routes),
  ],
  declarations: [StatusComponent],
  providers: [UserService]
})
export class StatusModule { }
