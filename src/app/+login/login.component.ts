import { Component, ElementRef, OnInit, style, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../services/user.service';

import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    .example-full-width {
      width: 100%;
    }

    .example-card {
      width: 40%;
    }

    .loading {
      margin-top: 10%;
      margin-left: 45%;
    }

    .mat-icon {
      cursor: pointer;
    }

    .example-header-image {
      background-image: url('./../../assets/captiveportal-wifi.png');
      background-size: cover;
    }
  `]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hide = true;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router) {}

  ngOnInit() {
    /**
     * username to login in proxy
     * password to login in proxy
     */
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {

    const user = this.loginForm.value.username;
    const pass = this.loginForm.value.password;

    this.loading = true;

    this.userService.attemptAuth(user, pass)
        .subscribe(
          data => {
            this.router.navigateByUrl('');
            this.loading = false;
          },
          err => {
            this.loading = false;
            this.snackBar.open(err, 'X', {duration: 3000});
          }
        );
  }
}
