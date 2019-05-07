import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '@env/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  loading = false;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {

    console.log(this.authService.getToken());

    this.httpClient.post<any>(env.urlProxy, {cmd: 'get', manager: 'downWeek', secret: this.authService.getToken()}).subscribe(data => {
      console.log(data);
    });

  }

  ngOnDestroy(): void {

  }

}

