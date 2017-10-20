import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-top-bar',
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-ingo">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" [hidden]="isAutenticate()">
            <a class="nav-link" [routerLink]="[ 'login' ]">Auntenticarse</a>
          </li>
          <li class="nav-item" [hidden]="!isAutenticate()">
            <a class="nav-link" [routerLink]="[ 'status' ]">Estado de la cuenta</a>
          </li>
          <li class="nav-item" [hidden]="!isAutenticate()">
            <a class="nav-link" [routerLink]="[ 'about' ]">Acerca de</a>
          </li>
          
        </ul>
      </div>
   </nav>
  `,
  styles: [`
    nav {
      background-color: #59a9ff;
      min-height: 450px;
      height: 100%;
    }

    nav > div > ul > li > a {
      color: white;
    }
  `]
})
export class TopBarComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  isAutenticate(): boolean {
    return this.userService.isAutenticated();
  }

}
