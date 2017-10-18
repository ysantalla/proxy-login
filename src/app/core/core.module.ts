import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell/shell.component';
import { TopBarComponent } from './shell/top-bar/top-bar.component';
import { MainContentComponent } from './shell/main-content/main-content.component';

import { Routes, RouterModule } from '@angular/router';

import { ApiService } from '../services/api.service';
import { JwtService } from '../services/jwt.service';
import { UserService } from '../services/user.service';
import { AuthGuard } from '../services/auth-guard.service';

import {
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatButtonModule
} from '@angular/material';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: './../+login/login.module#LoginModule',
    //canActivate: [AuthGuard],
    data: {title: 'Login'}
  },
  {
    path: '',
    loadChildren: './../+status/status.module#StatusModule',
    canLoad: [AuthGuard],
    data: {title: 'Status'}
  },
  {
    path: 'about',
    loadChildren: './../+about/about.module#AboutModule',
    data: {title: 'About'}
  },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  exports: [
    ShellComponent,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  declarations: [
    ShellComponent,
    TopBarComponent,
    MainContentComponent
  ],
  providers: [ApiService, JwtService, UserService, AuthGuard]
})
export class CoreModule { }
