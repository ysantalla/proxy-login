import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@app/core/services/auth.service';
import { MatSnackBar } from '@angular/material';

import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '@app/core/services/api.service';


@Component({
  selector: 'app-login',
  template: `
    <div *ngIf="loading">
      <mat-progress-bar class="loading" color="warn"></mat-progress-bar>
    </div>
    <br />
    <div class="container" fxLayout="column" fxLayoutAlign="center center">
      <div class="item" fxFlex="50%" fxFlex.xs="90%" fxFlex.md="90%">
        <form [formGroup]="loginForm" #f="ngForm" (ngSubmit)="onLogin()" class="form">
          <div class="mat-elevation-z8">
            <mat-toolbar color="primary">
              <h1 class="mat-h1">Iniciar Sesión</h1>
            </mat-toolbar>
            <mat-card class="card">
              <mat-card-header class="header-logo">
                <img mat-card-image class="logo" src="./assets/logo_150x150.png" alt="icon">
              </mat-card-header>
              <mat-card-content>
                <mat-form-field class="full-width">
                  <input matInput required type="text" placeholder="Usuario UPR" formControlName="user">
                </mat-form-field>

                <mat-form-field class="full-width">
                    <input matInput history="false" required
                            [type]="hide ? 'password' : 'text'" placeholder="Contraseña" formControlName="pass">
                    <mat-icon matSuffix (click)="hide = !hide">{{hide ? 'visibility' : 'visibility_off'}}</mat-icon>
                </mat-form-field>
              </mat-card-content>
              <mat-card-actions>
                <button mat-raised-button color="primary" type="submit" [disabled]="!loginForm.valid" aria-label="login">
                  <mat-icon>lock</mat-icon>
                  <span>Entrar</span>
                </button>
              </mat-card-actions>
            </mat-card>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .full-width{
      width: 100%;
    }

    .mat-icon {
      cursor: pointer;
    }

    .header-logo {
      align-items: center;
      justify-content: center;
    }

    .logo {
      width: 40%;
    }

    .loading {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1025;
    }

    .card {
      max-width: 400px;
    }
  `]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      pass: ['', Validators.required]
    });
  }

  onLogin(): void {
    this.loading = true;

    if (this.loginForm.valid) {
      this.loginForm.disable();

      this.apiService.login(this.loginForm.value.user, this.loginForm.value.pass).subscribe(token => {

        if (token) {

          this.apiService.dicover().subscribe((data: any) => {

            this.authService.setDownload(data);
            this.loading = false;
            const login: any = this.authService.login(token);

            if (login.status) {
              this.router.navigate(['dashboard']);
            } else {
              this.loginForm.enable();
            }
            this.snackBar.open(login.message, 'X', {duration: 3000});
          });

        } else {
          this.snackBar.open('Error, volver a intentar', 'X', {duration: 3000});
          this.loginForm.enable();
        }
      }, (error: HttpErrorResponse) => {
        this.loginForm.enable();
        this.loading = false;

        if (error.status === 400) {
          this.snackBar.open('Usuario o contraseña incorrecto', 'X', {duration: 3000});
        } else {
          this.snackBar.open(error.message, 'X', {duration: 3000});
        }
      });

    } else {
      this.loading = false;
      console.log('Form not valid');
    }

  }

}
