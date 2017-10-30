import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-shell',
  template: `
    <app-top-bar></app-top-bar>
    <br>
    <div fxLayout="row" fxLayoutAlign="center center">    
      <div fxFlex="10" class="one">
        <div class="svglogo">
            <img width="" src="../../assets/captiveportal-wifi.png">
        </div>
      </div>
    </div>
    <br>
    <div fxLayout="row" fxLayoutAlign="center center">    
      <app-main-content>
      </app-main-content>
    </div>
  `,
  styles: [`
    .svglogo > img {
      width: 100%;
      height: 100%;
    }
  `]
})
export class ShellComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.router.events
    .filter((event) => event instanceof NavigationEnd)
    .map(() => this.activatedRoute)
    .map((route) => {
      while (route.firstChild) {
        route = route.firstChild;
        return route;
      }
    })
    .filter((route) => route.outlet === 'primary')
    .mergeMap((route) => route.data)
    .subscribe((event) => this.titleService.setTitle(event['title']));
  }
}
