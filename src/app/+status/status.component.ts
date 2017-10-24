import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as Chart from 'chart.js';

import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

import { Observable } from 'rxjs';

@Component({
    selector: 'app-status',
    templateUrl: './status.component.html',
    styles: []
})
export class StatusComponent implements OnInit {

    @ViewChild('myChart') Chart: ElementRef;
    color = '#00838F';
    consumption = 0;
    quota = 0;

    constructor(
        private userService: UserService,
        private router: Router
    ) { 
        
    }

    ngOnInit() {
        this.userService.statusUser()
            .subscribe(
                data => {

                    this.consumption = data.consumption / 1024 / 1024;
                    this.quota = data.quota / 1024 / 1024;
                    const ctx = this.Chart.nativeElement.getContext('2d');

                    if ((this.consumption * 100 / this.quota) > 85) {
                        this.color = '#E64643';
                    }

                    const myChart = new Chart(ctx, {
                        type: 'pie',
                        data: {
                            labels: ['Consumo (Mb)', 'Kuota (Mb)'],
                            datasets: [
                                {
                                    label: 'Kuota',
                                    backgroundColor: [this.color],
                                    data: [Math.round(this.consumption), Math.round(this.quota)]
                                }
                            ]
                        },
                        options: {
                            legend: { display: true },
                            title: {
                                display: true,
                                text: `Consumo de Kuota ${Math.round(this.quota)} mb`
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
                    this.router.navigateByUrl('login');
                });
    }
}
