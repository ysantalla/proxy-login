import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-content',
  template: `
    <div class="container" fxLayout fxLayout.xs="row" fxLayoutAlign="center">
      <div class="item" fxFlex="80%">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 2%;
    }
  `]
})
export class MainContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
