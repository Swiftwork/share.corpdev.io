import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../core/core.module';
import { LoginComponent } from './components/login/login.component';
import { TopicComponent } from './components/topic/topic.component';
import { TopicsService } from './services/topics.service';
import { AuthView } from './views/auth/auth.view';
import { TopicsView } from './views/topics/topics.view';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';

export const DECLARATIONS: any[] = [
  /*=== VIEWS ===*/
  AuthView,
  TopicsView,

  /*=== COMPONENTS ===*/
  LoginComponent,
  SidebarComponent,
  TopbarComponent,
  TopicComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

    CoreModule,
  ],
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        TopicsService,
      ],
    };
  }
}
