import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { AuthService } from '@app/core/services/auth.service';
import { ApiService } from '@app/core/services/api.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-profile',
  template: `
    <div class="loading">
      <mat-progress-bar *ngIf="loading" class="loading" color="warn"></mat-progress-bar>
    </div>
    <br />
    <div class="container" fxLayout="row" fxLayoutAlign="center center">
      <div class="item" fxFlex="98%" fxFlex.xs="98%" fxFlex.md="98%">

        <div class="mat-elevation-z8">
          <mat-toolbar color="primary">
            <h1 class="mat-h1">Perfil de Usuario</h1>
          </mat-toolbar>
          <mat-card class="user-details-card">
            <mat-card-content>

              <mat-grid-list *ngIf="profile" cols="2" rowHeight="60">
                <mat-grid-tile><h3 class="mat-h3">Usuario:</h3></mat-grid-tile>
                <mat-grid-tile><h3 class="mat-h3"> {{profile.name}}</h3></mat-grid-tile>
                <mat-grid-tile><h3 class="mat-h3">Kuota:</h3></mat-grid-tile>
                <mat-grid-tile><h3 class="mat-h3"> {{profile.quota}}</h3></mat-grid-tile>
                <mat-grid-tile><h3 class="mat-h3">Consumo:</h3></mat-grid-tile>
                <mat-grid-tile><h3 class="mat-h3"> {{profile.consumption}}</h3></mat-grid-tile>
                <mat-grid-tile><h3 class="mat-h3">Grupos:</h3></mat-grid-tile>
                <mat-grid-tile>
                  <mat-chip-list *ngFor="let role of profile.groups">
                    <mat-chip class="role" color="accent">{{role}}</mat-chip>
                  </mat-chip-list>
                </mat-grid-tile>
              </mat-grid-list>

              <h2 *ngIf="!profile" class="mat-h2">Datos no encontrados</h2>

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
    styles: [`

      mat-chip.role {
        margin: 10px;
      }

      .loading {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1025;
      }
    `]
})
export class ProfileComponent implements OnInit {

  loading = false;
  profile: any;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loading = true;

      this.apiService.comandGet(this.authService.getDownload().manager, this.authService.getToken()).subscribe(data => {
        this.profile = data;
        this.loading = false;
      }, (error: HttpErrorResponse) => {
        this.loading = false;
        this.snackBar.open(error.message, 'X', {duration: 3000});
      });

  }

}
