import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <div class="container" fxLayout fxLayout.xs="row" fxLayoutAlign="center">
      <div class="item" fxFlex="50%">
          <mat-card class="example-card">
            <mat-card-header>
              <mat-card-title><h1>Acerca de</h1></mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <h2>Desarrollador backend</h2>
              <h3><mat-icon>person</mat-icon>Ing. Luis Angel Méndez Gort</h3>
              <a href="mailto:luis.mendez@upr.edu.cu"><mat-icon>email</mat-icon>luis.mendez@upr.edu.cu</a>
            </mat-card-content>
            <mat-card-content>
              <h2>Desarrollador frontend</h2>
              <h3><mat-icon>person</mat-icon>Ing. Yasmany Santalla Pereda</h3>
              <a href="mailto:ysantalla@upr.edu.cu"><mat-icon>email</mat-icon>ysantalla@upr.edu.cu</a>
            </mat-card-content>
          </mat-card>
      </div>
    </div>
  `,
  styles: []
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
