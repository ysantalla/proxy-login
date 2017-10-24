import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router/';

import { StatusComponent } from './status.component';
import { UserService } from '../services/user.service';

import { 
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule,
  MatProgressSpinnerModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: StatusComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(routes),
  ],
  declarations: [StatusComponent],
  providers: [UserService]
})
export class StatusModule { }
