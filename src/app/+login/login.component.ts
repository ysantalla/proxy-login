import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../services/user.service';

import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    .mat-icon {
      cursor: pointer;
    }
    .example-full-width {
      width: 100%;
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
    private router: Router,
    private snackBar: MatSnackBar) {}

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
    this.loginForm.disable();

    this.userService.attemptAuth(user, pass)
        .subscribe(
          data => {
            this.router.navigateByUrl('');
            this.loading = false;
          },
          err => {
            this.loading = false;
            this.snackBar.open("Usuario o contraseñas no válidos", 'X', {duration: 3000});
            this.loginForm.enable();
          }
        );
  }
}
