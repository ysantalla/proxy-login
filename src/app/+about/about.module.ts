import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { RouterModule, Routes } from '@angular/router/';

import {
  MatCardModule,
  MatIconModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AboutComponent]
})
export class AboutModule { }
