import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgCoreModule } from '@evry/ng-core';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { CoreModule } from '../core/core.module';
import { ArticleResolver } from './articles/shared/article.resolver';
import { ArticleService } from './articles/shared/article.service';
import { AssetService } from './assets/shared/asset.service';
import { SectionResolver } from './sections/shared/section.resolver';
import { SectionService } from './sections/shared/section.service';
import { TopicService } from './topics/topic.service';

import { ArticleComponent } from './articles/article/article.component';
import { ArticlesComponent } from './articles/articles.component';
import { AssetsComponent } from './assets/assets.component';
import { CodeEditorComponent } from './code/code-editor/code-editor.component';
import { CodeComponent } from './code/code.component';
import { SectionComponent } from './sections/section/section.component';
import { SectionsComponent } from './sections/sections.component';

export const DECLARATIONS: any[] = [
  ArticleComponent,
  ArticlesComponent,
  AssetsComponent,
  CodeComponent,
  CodeEditorComponent,
  SectionComponent,
  SectionsComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    NgCoreModule,
    LazyLoadImageModule,

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
        ArticleResolver,
        ArticleService,
        AssetService,
        SectionResolver,
        SectionService,
        TopicService,
      ],
    };
  }
}
