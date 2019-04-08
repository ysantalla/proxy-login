import {
  NgModule,
  SkipSelf,
  Optional,
} from '@angular/core';
import { CommonModule } from '@angular/common';


import {
  HttpClientModule,
} from '@angular/common/http';

import { environment as env } from '@env/environment';
import { AuthService } from '@app/core/services/auth.service';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { RoleGuard } from '@app/core/guards/role.guard';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    AuthService,
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

