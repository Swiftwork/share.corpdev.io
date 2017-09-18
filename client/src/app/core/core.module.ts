import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BaseView } from './base/base.view';
import { ContentToolsDirective } from './content-tools/content-tools.directive';
import { ContentToolsService } from './content-tools/content-tools.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthService } from './services/auth.service';
import { SocketService } from './services/socket.service';
import { UserService } from './services/user.service';

export const DECLARATIONS: any[] = [
  BaseView,
  ContentToolsDirective,
];

@NgModule({
  imports: [
    /*=== VENDOR MODULES ===*/
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
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
        ContentToolsService,
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
