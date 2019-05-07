import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';

import { IndexComponent } from './index/index.component';
import { AuthGuard } from '@app/core/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    data: {title: 'Escritorio'},
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [IndexComponent]
})
export class DashboardModule { }
