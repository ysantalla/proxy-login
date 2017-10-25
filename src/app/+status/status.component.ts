import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';

import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

import { DialogQuota } from './dialog-quota.component';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';


@Component({
    selector: 'app-status',
    templateUrl: './status.component.html',
    styles: []
})
export class StatusComponent implements OnInit, OnDestroy {

    subscription: Subscription;

    color = 'primary';
    consumption = 0;
    quota = 0;
    value = 0;
    seconds = 10;

    constructor(
        private userService: UserService,
        private router: Router,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.subscription = Observable
            .interval(this.seconds * 1000)
            .flatMap(data => this.userService.statusUser())
            .subscribe(data => {
                this.updateQuota(data, true);
            });

        this.userService.statusUser()
            .subscribe(
            data => {
                this.updateQuota(data);
            },
            err => {
                this.router.navigateByUrl('login');
            }
            );
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(DialogQuota);

        dialogRef.afterClosed().subscribe(() => {
            this.userService.statusUser()
                .subscribe(
                data => {
                    this.updateQuota(data);
                },
                err => {
                    this.router.navigateByUrl('login');
                }
                );
        });
    }

    logged(): void {
        this.userService.logoutUser()
            .subscribe(
            data => {
                this.router.navigateByUrl('login');
            },
            err => {
                this.router.navigateByUrl('login');
            });
    }

    private updateQuota(data, flag: boolean = false): void {

        if (((data.consumption / 1024 / 1024) - this.consumption) >= 1) {
            if (flag) {
                this.snackBar.open(`Consumido ${Math.round(data.consumption / 1024 / 1024 - this.consumption)} Mb en los últimos ${this.seconds} segundos.`, 'X', { duration: 3000 });
            } else {
                this.snackBar.open(`Quota consumida ${Math.round(data.consumption / 1024 / 1024 - this.consumption)} Mb`, 'X', { duration: 3000 });
            }

        } else if (data.quota - data.consumption <= 0) {
            this.snackBar.open(`Quota consumida totalmente`, 'X', { duration: 3000 });
            this.subscription.unsubscribe();
        }

        this.consumption = data.consumption / 1024 / 1024;
        this.quota = data.quota / 1024 / 1024;
        this.value = this.consumption * 100 / this.quota;

        if (this.value > 60 && this.value < 85) {
            this.color = 'accent';
        }
        else if (this.value >= 85) {
            this.color = 'warn';
        }
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
