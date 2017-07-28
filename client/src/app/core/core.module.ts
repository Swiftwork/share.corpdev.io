import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Http, RequestOptions } from '@angular/http';

import { AuthConfig, AuthHttp } from 'angular2-jwt';

import { AuthService } from './auth/auth.service';

import { BaseView } from './base/base.view';

export const DECLARATIONS: any[] = [
  BaseView,
];

@NgModule({
  imports: [
    /*=== VENDOR MODULES ===*/
    CommonModule,
    ReactiveFormsModule,
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
        {
          provide: AuthHttp,
          deps: [Http, RequestOptions],
          useFactory: (http: Http, options: RequestOptions) =>
            new AuthHttp(new AuthConfig(), http, options),
        },
      ],
    };
  }
}
