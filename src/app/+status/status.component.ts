import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as Chart from 'chart.js';

import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
    selector: 'app-status',
    templateUrl: './status.component.html',
    styles: []
})
export class StatusComponent implements OnInit {

    @ViewChild('myChart') Chart: ElementRef;
    isLoggedIn = false;
    color = 'Primary';
    group = '';
    value = 0;
    name = '';
    username = '';
    quota = 0;

    currentUser: User;

    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit() {
        this.userService.statusUser()
            .subscribe(
                data => {

                    this.isLoggedIn = true;
                    this.value = data.consumption / 1024 / 1024;
                    //this.name = data.name;
                    this.username = data.userName;
                    this.quota = data.quota / 1024 / 1024;
                    const ctx = this.Chart.nativeElement.getContext('2d');

                    const myChart = new Chart(ctx, {
                        type: 'pie',
                        data: {
                            labels: ['Consumo (Mb)', 'Kuota (Mb)'],
                            datasets: [
                                {
                                    label: 'Kuota',
                                    backgroundColor: ['#3e95cd'],
                                    data: [this.value, this.quota]
                                }
                            ]
                        },
                        options: {
                            legend: { display: true },
                            title: {
                                display: true,
                                text: `Consumo de Kuota del usuario ${this.username}`
                            }
                        }
                    });
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
                });
    }
}
