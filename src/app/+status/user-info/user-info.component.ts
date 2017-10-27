import { Component, OnInit, Input } from '@angular/core';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-info',
  template: `
    <h2>{{user.name}}</h2>
  `,
  styles: []
})
export class UserInfoComponent implements OnInit {

  @Input()
  user: User;

  constructor() { }

  ngOnInit() {
    
  }

}
