import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-top-bar',
  template: `
      <div class="item" fxFlex="100%">
        <nav>
          <!-- this is default toolbar -->
          <mat-toolbar color="primary" fxLayout="column" fxLayout.xs="column">
            <a mat-menu-item routerLink="/"><mat-icon>directions_boat</mat-icon></a>
            <span class="fill-remaining-space"></span>

            <button mat-icon-button [matMenuTriggerFor]="menu">
              <mat-icon>more_vert</mat-icon>
            </button>

          </mat-toolbar>
        </nav>
      </div>

      <mat-menu #menu="matMenu" x-position="before">
        <a mat-menu-item [routerLink]="[ 'about' ]"><mat-icon>group</mat-icon>About</a>
      </mat-menu>
  `,
  styles: []
})
export class TopBarComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  isAutenticate(): boolean {
    return this.userService.isAutenticated();
  }

}
