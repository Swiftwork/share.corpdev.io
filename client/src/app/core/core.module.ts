import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { SocketService } from './services/socket.service';
import { UserService } from './services/user.service';

import { AuthService } from './services/auth.service';

import { BaseView } from './base/base.view';

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
        SocketService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    };
  }
}
