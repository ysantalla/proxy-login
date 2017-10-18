import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';

import {  CoreModule } from './core/core.module';
import { ShellComponent } from './core/shell/shell.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [ShellComponent]
})
export class AppModule { }
