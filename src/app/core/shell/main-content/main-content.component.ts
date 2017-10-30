import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-content',
  template: `
      <section>
        <router-outlet></router-outlet>
      </section>  
  `,
  styles: []
})
export class MainContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
