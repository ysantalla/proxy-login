import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-logout',
  template: `
    <p>
      Cerrardo sesión...
    </p>
  `,
  styles: []
})
export class LogoutComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.logoutUser()
      .subscribe(
      data => {
        this.router.navigateByUrl('login');
      },
      err => {
        this.router.navigateByUrl('login');
      });
  }

}
