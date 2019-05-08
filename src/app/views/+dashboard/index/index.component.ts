import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { Observable, interval, of, Subscription } from 'rxjs';
import { ApiService } from '@app/core/services/api.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { DirectoryService } from '@app/core/services/directory.service';
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
  isAdmin$: Observable<boolean>;
  data: any;

  subcription: Subscription;

  resetQuotaForm: FormGroup;
  userFormControl = new FormControl('', Validators.required);

  filteredUsers: Observable<any[]>;
  validUser = false;


  color = 'accent';
  mode = 'determinate';
  value = 0;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService,
    private directoryService: DirectoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isAuthenticated();

    this.resetQuotaForm = this.formBuilder.group({
      user: this.userFormControl
    });

    this.userFormControl.valueChanges
      .subscribe(data => {
        this.loading = true;

        if (typeof data === 'string') {
          this.validUser = false;
          this.filteredUsers = this._filter(data);

        } else {
          this.validUser = true;
        }
        this.loading = false;
      });

    this.apiService.comandGet(this.authService.getDownload().manager, this.authService.getToken()).subscribe((data: any) => {
      this.value = data.bytesCons * 100 / data.bytesQuota;
      this.data = data;

      if (this.value >= 90) {
        this.color = 'warn';
      } else {
        this.color = 'accent';
      }

    });

    this.subcription = interval(5000).subscribe(index => {
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

  _filter(name: string): Observable<any> {
    return this.directoryService.getProfesorList(name).pipe(
      map((data: any) => {
        const users: any[] = [];

        for (const key in data.data) {
          if ((data.data.hasOwnProperty(key)) && (typeof(data.data[key]) === 'object')) {

            if (
              data.data[key].mail &&
              data.data[key].employeenumber &&
              data.data[key].displayname &&
              data.data[key].givenname &&
              data.data[key].sn &&
              data.data[key].samaccountname
            ) {
              users.push({
                id: null,
                roles: [],
                email: data.data[key].mail[0],
                employeeNumber: data.data[key].employeenumber[0],
                fullname: data.data[key].displayname[0],
                firstname: data.data[key].givenname[0],
                lastname: data.data[key].sn[0],
                username: data.data[key].samaccountname[0],
              });
            }
          }
        }

        return users;
      }),
      catchError((err: any) => {
        return of([]);
      })
    );
  }

  onReset(): void {
    this.loading = true;

    if (this.resetQuotaForm.valid) {
      this.resetQuotaForm.disable();

      this.apiService.set(this.authService.getToken(), this.resetQuotaForm.value.user.username,
          0, this.authService.getDownload().manager).subscribe(data => {

        this.loading = false;

        this.resetQuotaForm.reset();

        this.snackBar.open('Cuota reseteada', 'X', {duration: 3000});

        this.resetQuotaForm.enable();
      }, (error: HttpErrorResponse) => {
        this.snackBar.open(error.message, 'X', {duration: 3000});
      });

    } else {
      this.loading = false;
      console.log('Form not valid');
    }
  }

}
