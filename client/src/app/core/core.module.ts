import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgCoreModule } from '@evry/ng-core/dist';

import { ContentToolsService } from '../shared/content-tools/content-tools.service';
import { AuthService } from './auth/shared/auth.service';
import { UserService } from './auth/shared/user.service';
import { SocketService } from './services/socket.service';

import { ContentToolsDirective } from '../shared/content-tools/content-tools.directive';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthInterceptor } from './auth/shared/auth.interceptor';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';

export const DECLARATIONS: any[] = [
  AuthComponent,
  LoginComponent,
  ContentToolsDirective,
  SidebarComponent,
  TopbarComponent,
];

@NgModule({
  imports: [
    /*=== VENDOR MODULES ===*/
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgCoreModule,
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
