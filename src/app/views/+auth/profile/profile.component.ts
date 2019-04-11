import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Subscription, Observable } from 'rxjs';


@Component({
  selector: 'app-profile',
  template: `
    <div class="loading">
      <mat-progress-bar *ngIf="loading" color="warn"></mat-progress-bar>
    </div>
    <br />
    <div class="container" fxLayout="row" fxLayoutAlign="center center">
      <div class="item" fxFlex="50%" fxFlex.xs="98%" fxFlex.md="70%">

        <div class="mat-elevation-z8">
          <mat-card class="user-details-card">
            <mat-card-header>
              <mat-card-title>
                <h1 class="mat-h1">Perfil de Usuario</h1>
              </mat-card-title>
            </mat-card-header>

            <mat-card-content>

              <p>hello</p>
            </mat-card-content>
            <mat-card-actions>
              <button mat-raised-button color="accent" type="button"
                routerLink="/dashboard" routerLinkActive="active"
                aria-label="dashboard">
              <mat-icon>dashboard</mat-icon>
              <span>Escritorio</span>
            </button>
            </mat-card-actions>
          </mat-card>

        </div>
      </div>
    </div>

    `,
    styles: [
    `mat-chip.role {
        margin: 10px;
      }
    `
    ]
})
export class ProfileComponent implements OnInit, OnDestroy {

  loading = false;
  hide = true;

  meQuerySubcription: Subscription;

  constructor(
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {

    this.loading = true;

  }

  ngOnDestroy(): void {
    this.meQuerySubcription.unsubscribe();
  }

}
