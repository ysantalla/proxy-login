import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

import {MatSnackBar} from '@angular/material';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-status',
    templateUrl: './status.component.html',
    styles: []
})
export class StatusComponent implements OnInit, OnDestroy {

    color = 'primary';
    consumption = 0;
    quota = 0;
    value = 0;
    
    constructor(
        private userService: UserService,
        private router: Router,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        let newobs = Observable.interval(5000).flatMap(data => this.userService.statusUser());
        let newsub = newobs.subscribe(data => {
            this.updateKuota(data);            
        });

        this.userService.statusUser()
            .subscribe(
                data => {
                    this.updateKuota(data);
                },
                err => {
                  this.router.navigateByUrl('login');
                }
            );


    }

    logged(): void {
        this.userService.logoutUser()
            .subscribe(
                data => {
                    this.router.navigateByUrl('login');
                },
                err => {
                    console.log(err);
                    this.router.navigateByUrl('login');
                });
    }

    private updateKuota(data): void {
        if (Math.round(data.consumption / 1024 / 1024) - this.consumption >= 1) {
            this.snackBar.open(`Consumido ${Math.round(data.consumption / 1024 / 1024) - this.consumption}`, 'X', {duration:3000});
        }            

        this.consumption = data.consumption / 1024 / 1024;
        this.quota = data.quota / 1024 / 1024;
        this.value = this.consumption * 100 / this.quota;

        console.log(this.consumption);

        if (this.value > 60 && this.value < 85){
            this.color = 'accent';
        }
        else if (this.value >= 85) {
            this.color = 'warn';
        }
    }

    public ngOnDestroy(): void {
        
    }
}
