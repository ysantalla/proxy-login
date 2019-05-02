import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '@app/core/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { routerTransition } from '@app/core/animations/router.transition';
import { environment as env } from '@env/environment';

import { Menu } from '@app/core/models/menu.model';


@Component({
  selector: 'app-layout',
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav
        #drawer
        class="sidenav"
        fixedInViewport="false"
        [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
        [mode]="(isHandset$ | async) ? 'over' : 'side'"
        [opened]="!(isHandset$ | async) && (isLoggedIn$ | async)">
        <mat-toolbar class="sidenav-navbar" color="primary">
          <img class="logo" src="assets/logo_64x64.png" />
          <span>{{appName}}</span>
        </mat-toolbar>

        <app-nav-menu [items]="dashboard"></app-nav-menu>

      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar class="navbar" color="primary">
          <mat-toolbar-row>
            <button
              type="button"
              aria-label="Toggle sidenav"
              mat-icon-button
              (click)="drawer.toggle()">
              <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
            </button>

            <span *ngIf="!(isHandset$ | async)">{{appName}}</span>

            <span class="spacer"></span>

            <button mat-button [matMenuTriggerFor]="menu">
              <span *ngIf="(isLoggedIn$ | async)">Bienvenido {{username$ | async}}</span>
              <mat-icon>more_vert</mat-icon>
            </button>
            <mat-menu #menu="matMenu">
              <a mat-menu-item *ngIf="isLoggedIn$ | async" target="_blank" href="https://clave.upr.edu.cu/iisadmpwd/">
                <mat-icon>lock_open</mat-icon>
                <span>Cambiar Contraseña</span>
              </a>

              <button mat-menu-item *ngIf="isLoggedIn$ | async" routerLink="auth/profile">
                <mat-icon>person</mat-icon>
                <span>Perfil</span>
              </button>

              <mat-divider *ngIf="isLoggedIn$ | async"></mat-divider>

              <button mat-menu-item *ngIf="isLoggedIn$ | async"  (click)="logout()">
                <mat-icon>exit_to_app</mat-icon>
                <span>Cerrar Sesión</span>
              </button>

              <button mat-menu-item *ngIf="!(isLoggedIn$ | async)" routerLink="auth/login">
                <mat-icon>lock_open</mat-icon>
                <span>Iniciar Sesión</span>
              </button>
            </mat-menu>
          </mat-toolbar-row>
        </mat-toolbar>

        <div class="layout">
          <div class="router">
            <div class="item" [@routerTransition]="o.isActivated && o.activatedRoute.routeConfig.path">
              <router-outlet #o="outlet"></router-outlet>
            </div>
          </div>

          <br/>

          <footer class="footer">
            <mat-toolbar color="primary">
              <span>{{appName}} &#169; {{year}} - Todos los Derechos Reservados</span>
            </mat-toolbar>
          </footer>
        </div>

      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .router {
      min-height: 87vh;
      height: auto;
    }

    .sidenav-container {
      height: 100%;
    }

    mat-nav-list a.menu {
      margin-top: 2px;
      margin-bottom: 2px;
    }

    .navbar {
      box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);
      position: sticky;
      z-index: 1025;
      top: 0;
    }

    .sidenav {
      box-shadow: 3px 0 6px rgba(0,0,0,.24);
    }

    .sidenav-navbar {
      box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);
    }

    .mat-toolbar-row, .mat-toolbar-single-row {
      height: 64px;
    }

    mat-toolbar button.active, mat-toolbar a.active {
      color: white;
      background: rgba(27, 26, 26, 0.2);
      padding-top: 13.5px;
      padding-bottom: 13px;
    }

    mat-toolbar button.mat-button, mat-toolbar a.mat-button {
      color: white;
      padding-top: 13.5px;
      padding-bottom: 13px;
    }

    a.active {
      background: rgba(27, 26, 26, 0.2);
    }

    .logo {
      width: 50px;
      padding-left: 10px;
      padding-right: 10px;
    }

    footer > .mat-toolbar {
      white-space: normal;
      padding-top: 20px;
      height: 80px;
    }

    .mat-list, .mat-nav-list {
      padding-top: 3px;
      padding-bottom: 3px;
      display: block;
    }

  `],
  animations: [routerTransition]
})
export class LayoutComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  username$: Observable<string>;

  dashboard: Menu;

  envName = env.envName;
  appName = env.appName;
  year = new Date().getFullYear();
  isProd = env.production;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.dashboard = {
      heading: 'Escritorio',
      icon: 'dashboard',
      link: '/dashboard',
      pages: []
    };

    /*this.adminMenu = {
      heading: 'Administración',
      icon: 'settings',
      pages: [
        {
          heading: 'Gestión de Usuario',
          link: '/admin/user',
          icon: 'person'
        },
        {
          heading: 'Gestión de Roles',
          link: '/admin/role',
          icon: 'supervisor_account'
        },
        {
          heading: 'Gestión de Archivos',
          link: '/admin/file',
          icon: 'folder'
        }
      ]
    };*/
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isAuthenticated();
    this.username$ = this.authService.getUsername();
  }

  logout(): void {
    this.authService.logout();
    this.snackBar.open('Usted a cerrado su sesión', 'X', {duration: 3000});
    this.router.navigate(['auth', 'login']);
  }

}
