import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatAccordion } from '@angular/material';
import { Menu } from '@app/core/models/menu.model';


@Component({
  selector: 'app-nav-menu',
  template: `
      <!-- wrap all the nav items in an accordion panel -->
      <mat-accordion displayMode="flat">
        <mat-nav-list *ngIf="items">

          <!-- use a simple a for an item that has no children,
            match up the styling to the expansion panel styles -->
          <a class="menu" mat-list-item *ngIf="items.pages.length === 0"
              [routerLink]="items.link"
              routerLinkActive="active">
              <mat-icon>{{items.icon}}</mat-icon>
              <span class="nav-link-text">{{items.heading}}</span>
          </a>

          <!-- use expansion panel for heading item with sub page links -->
          <mat-expansion-panel *ngIf="items.pages.length > 0" class="mat-elevation-z0">

            <mat-expansion-panel-header class="menu" [expandedHeight]="'48px'">
              <mat-panel-title class="nav-link" mat-list-item>
                <mat-icon>{{items.icon}}</mat-icon>
                <span class="nav-link-text">{{items.heading}}</span>
              </mat-panel-title>
            </mat-expansion-panel-header>

            <div class="nav-section">
              <!-- loop through all your sub pages inside the expansion panel content -->
              <a class="nav-link nav-link-subpage menu" mat-list-item *ngFor="let page of items.pages"
                  [routerLink]="page.link"
                  routerLinkActive="active">
                  <mat-icon style="margin-left: 1vw">{{page.icon}}</mat-icon>
                  <span class="nav-link-text">{{page.heading}}</span>
              </a>
            </div>
          </mat-expansion-panel>

        </mat-nav-list>
      </mat-accordion>
  `,
  styles: [`
    mat-expansion-panel.mat-expansion-panel {
      margin: 0px;
      border-radius: 0px;
    }
    .nav-link {
      margin: 2px 0px 0px;

    }
    a.active {
      background: rgba(27, 26, 26, 0.2);
    }
    .mat-accordion .mat-expansion-panel {
      border-bottom-right-radius: 0px;
      border-bottom-left-radius: 0px;
      border-top-right-radius: 0px;
      border-top-left-radius: 0px;
    }
    .mat-expansion-panel-header {
      padding: 0 15px;
      font-size: 16px;
    }

  `]
})
export class NavMenuComponent implements OnInit {

  @Input() items: Menu;

  constructor() {}

  ngOnInit() {}

}
