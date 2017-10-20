import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-shell',
  template: `
    <br>
    <br>
    <section>
      <div class="container">
          <div class="row justify-content-md-center">
              <div class="col col-md-4">
                  <div class="svglogo">
                      <img src="../../assets/captiveportal-wifi.png" width="65%" height="65%">
                  </div>
              </div>
          </div>
      </div>
      <app-main-content>
      </app-main-content>
      <br>
      <app-top-bar>
      </app-top-bar>
    </section>
  `,
  styles: []
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
