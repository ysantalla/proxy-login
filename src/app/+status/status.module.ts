import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router/';

import { StatusComponent } from './status.component';
import { DialogQuota } from './dialog-quota.component';

import { UserService } from '../services/user.service';

import { 
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatSnackBarModule,
  MatDialogModule,
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
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatInputModule,
    RouterModule.forChild(routes),
  ],
  declarations: [StatusComponent, DialogQuota],
  providers: [UserService],
  entryComponents: [DialogQuota]
})
export class StatusModule { }
