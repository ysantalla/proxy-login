import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router/';

import { MatProgressSpinnerModule,
         MatInputModule,
         MatCardModule,
         MatSnackBarModule,
         MatButtonModule,
         MatIconModule } from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent],
  providers: [UserService]
})
export class LoginModule { }
