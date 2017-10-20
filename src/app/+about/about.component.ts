import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `    
    <section>
      <div class="container">
          <div class="row">
            <div class="col col-md-12">
              <h3>Acerca de proxy-go v1.0.0</h3>
            </div>
          </div>
          <br>
          <div class="row">
            <div class="col col-md-12">
              <h3>Desarrollador backend</h3>
              <h5>Ing. Luis Angel Méndez Gort</h5>
              <a href="mailto:luis.mendez@upr.edu.cu">luis.mendez@upr.edu.cu</a>                  
            </div>
          </div>
          <br>
          <div class="row">
            <div class="col col-md-12">
              <h3>Desarrollador frontend</h3>
              <h5>Ing. Yasmany Santalla Pereda</h5>
              <a href="mailto:ysantalla@upr.edu.cu">ysantalla@upr.edu.cu</a>                
            </div>
          </div>
      </div>
    </section>
  `,
  styles: []
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
