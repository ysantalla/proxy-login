import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-info',
  template: `
    <h2>{{user.name}}</h2>
  `,
  styles: []
})
export class UserInfoComponent implements OnInit {

  user: User = {name: "", username: "", isAdmin: false, quotaGroup: ""};

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.userInfo()
        .subscribe(
        data => {
            this.user = data;
        },
        err => {
            console.log(err);
        }
    );
  }

}
