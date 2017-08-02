import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../core/core.module';
import { ArticleComponent } from './components/article/article.component';
import { LoginComponent } from './components/login/login.component';
import { ArticleService } from './services/article.service';
import { TopicService } from './services/topic.service';

import { ArticleView } from './views/article/article.view';
import { ArticlesView } from './views/articles/articles.view';
import { AuthView } from './views/auth/auth.view';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';

export const DECLARATIONS: any[] = [
  /*=== VIEWS ===*/
  ArticleView,
  ArticlesView,
  AuthView,

  /*=== COMPONENTS ===*/
  LoginComponent,
  SidebarComponent,
  TopbarComponent,
  ArticleComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
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
        ArticleService,
        TopicService,
      ],
    };
  }
}
