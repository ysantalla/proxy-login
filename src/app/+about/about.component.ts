import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <h3>Acerca de proxy-go v1.0.0</h3>
    <h2>Desarrollador backend</h2>
    <h3><mat-icon>person</mat-icon>Ing. Luis Angel Méndez Gort</h3>
    <a href="mailto:luis.mendez@upr.edu.cu"><mat-icon>email</mat-icon>luis.mendez@upr.edu.cu</a>
    <h2>Desarrollador frontend</h2>
    <h3><mat-icon>person</mat-icon>Ing. Yasmany Santalla Pereda</h3>
    <a href="mailto:ysantalla@upr.edu.cu"><mat-icon>email</mat-icon>ysantalla@upr.edu.cu</a>
  `,
  styles: []
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
