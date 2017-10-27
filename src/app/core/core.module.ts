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
import { AuthGuardService } from '../services/auth-guard.service';

import {
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatButtonModule
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './../+login/login.module#LoginModule',
    data: {title: 'Proxy UPR'}
  },
  {
    path: '',
    loadChildren: './../+status/status.module#StatusModule',
    canLoad: [AuthGuardService],
    data: {title: 'Estado'}
  },
  {
    path: 'logout',
    loadChildren: './../+logout/logout.module#LogoutModule',
    canLoad: [AuthGuardService],
    data: {title: 'Cerrar sesión'}
  },
  {
    path: 'about',
    loadChildren: './../+about/about.module#AboutModule',
    data: {title: 'Acerca de'}
  },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    FlexLayoutModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    ShellComponent,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  declarations: [
    ShellComponent,
    TopBarComponent,
    MainContentComponent
  ],
  providers: [ApiService, JwtService, UserService, AuthGuardService]
})
export class CoreModule { }
