import { Component, ElementRef, OnInit, style, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    .input-group-addon {
      style="cursor: pointer;
    }
  `]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hide = true;
  error = false;
  loading = false;
  class="form-control";

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
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
    this.error = false;

    this.loginForm.disable();

    this.userService.attemptAuth(user, pass)
        .subscribe(
          data => {
            this.router.navigateByUrl('');
            this.loading = false;
          },
          err => {
            this.loading = false;
            this.error = true;
            this.loginForm.enable();
            this.class = "form-control is-invalid";
          }
        );
  }
}
