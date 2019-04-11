import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { User } from '@app/core/models/user.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  isAdmin$: Observable<boolean>;
  isSpecialist$: Observable<boolean>;
  isStudent$: Observable<boolean>;

  user$: Observable<User>;

  loading = false;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {

    this.user$ = this.authService.getAsyncUser();

    this.user$.subscribe(user => {
      if (user) {
        this.isAdmin$ = new BehaviorSubject(user.roles.some(role => role.name === 'ADMIN')).asObservable();
        this.isSpecialist$ = new BehaviorSubject(user.roles.some(role => role.name === 'SPECIALIST')).asObservable();
        this.isStudent$ = new BehaviorSubject(user.roles.some(role => role.name === 'STUDENT')).asObservable();
      }
    });

  }

  ngOnDestroy(): void {

  }

}

