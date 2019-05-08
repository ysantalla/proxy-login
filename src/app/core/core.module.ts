import {
  NgModule,
  SkipSelf,
  Optional,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  HttpClientModule,
} from '@angular/common/http';

import { AuthGuard } from '@app/core/guards/auth.guard';
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { RedirectGuard } from './guards/redirect.guard';
import { DirectoryService } from './services/directory.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    RedirectGuard,
    AuthService,
    DirectoryService,
    ApiService
  ],
  declarations: []
})
export class CoreModule {

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
