import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from '@app/core/guards/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { RedirectGuard } from '@app/core/guards/redirect.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {title: 'Iniciar Sesión'},
    canActivate: [RedirectGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {title: 'Iniciar Sesión'},
    canActivate: [RedirectGuard]
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginComponent]
})
export class AuthModule { }
