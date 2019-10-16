import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { Observable, interval, of, Subscription } from 'rxjs';
import { ApiService } from '@app/core/services/api.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  loading = false;
  isLoggedIn$: Observable<boolean>;
  data: any;

  subcription: Subscription;

  color = 'accent';
  mode = 'determinate';
  value = 0;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isAuthenticated();

    this.apiService.comandGet(this.authService.getDownload().manager, this.authService.getToken()).subscribe((data: any) => {
      this.value = data.bytesCons * 100 / data.bytesQuota;
      this.data = data;

      if (this.value >= 90) {
        this.color = 'warn';
      } else {
        this.color = 'accent';
      }

    });

    this.subcription = interval(20000).subscribe(index => {

      this.apiService.comandGet(this.authService.getDownload().manager, this.authService.getToken()).subscribe((data: any) => {
        this.value = data.bytesCons * 100 / data.bytesQuota;
        this.data = data;

        if (this.value >= 90) {
          this.color = 'warn';
        } else {
          this.color = 'accent';
        }

      });
    });

  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  displayFn(user?: any): string | undefined {
    return user
      ? `${user.firstname} ${user.lastname} --- ${user.username} --- ${
          user.employeeNumber
        }`
      : undefined;
  }

}
