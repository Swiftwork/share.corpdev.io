import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { UserService } from './services/user.service';

import { AuthConfig, AuthHttp } from 'angular2-jwt';

import { AuthService } from './services/auth.service';

import { BaseView } from './base/base.view';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}

export const DECLARATIONS: any[] = [
  BaseView,
];

@NgModule({
  imports: [
    /*=== VENDOR MODULES ===*/
    CommonModule,
    HttpClientModule,

    /*=== CORE MODULES ===*/
  ],
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
})
export class CoreModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AuthService,
        UserService,
        {
          provide: AuthHttp,
          deps: [Http, RequestOptions],
          useFactory: authHttpServiceFactory,
        },
      ],
    };
  }
}
