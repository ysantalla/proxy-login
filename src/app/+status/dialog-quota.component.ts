import { Component, OnInit, Inject, OnDestroy } from '@angular/core';

import { MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { UserService } from '../services/user.service';

@Component({
  selector: 'dialog-quota',
  template: `
    <div mat-dialog-title>
      Quota nueva
    </div>
    <div mat-dialog-content>
      <mat-form-field>
        <input matInput type="text" tabindex="1" placeholder="Usuario" [(ngModel)]="username" name="username">
      </mat-form-field>
      <mat-form-field>
        <input matInput type="number" tabindex="1" placeholder="Quota (Mb)" [(ngModel)]="quota" name="quota">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="reset()" [disabled]="!username" tabindex="2">Reiniciar</button>
      <button mat-button (click)="change()" [disabled]="!username || quota <= 0" tabindex="-1">Cambiar</button>
      <button mat-button (click)="onNoClick()" tabindex="-1">Cerrar</button>
    </div>
`,
  styles: []
})
export class DialogQuota implements OnDestroy {

  username: string = '';
  quota: number = 0;

  constructor(
    public dialogRef: MatDialogRef<DialogQuota>,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  reset(): void {
    this.userService.changeQuota(this.username, 1) 
      .subscribe(
      data => {
          this.snackBar.open('Quota reseteada', 'X', {duration: 3000});
      },
      err => {
          this.snackBar.open('Error', 'X', {duration: 3000});
          console.log(err)
      }
    );
  }

  change(): void {
    this.userService.changeQuota(this.username, this.quota * 1024 * 1024) 
      .subscribe(
      data => {
        this.snackBar.open('Quota cambiada', 'X', {duration: 3000});
      },
      err => {
        this.snackBar.open('Error', 'X', {duration: 3000});
          console.log(err)
      }
    );
  }

  public ngOnDestroy(): void {
      
  }
}
