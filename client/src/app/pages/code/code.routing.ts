import { AnimationTriggerMetadata } from '@angular/animations';
import { RouterModule, Routes } from '@angular/router';

/* Views */
import { ArticleResolver } from '../../shared/services/article.resolver';
import { SectionResolver } from '../../shared/services/section.resolver';
import { ArticleView } from '../../shared/views/article/article.view';
import { AssetsView } from '../../shared/views/assets/assets.view';
import { CodeView } from '../../shared/views/code/code.view';
import { TopicView } from '../../shared/views/topic/topic.view';

/* Router */
export const CODE_ROUTES: Routes = [
  {
    path: 'topic/:id',
    component: TopicView,
    resolve: {
      articles: ArticleResolver,
    },
  },
  {
    path: 'article/:id',
    component: ArticleView,
    resolve: {
      sections: SectionResolver,
    },
  },
  {
    path: 'assets',
    component: AssetsView,
  },
  {
    path: 'code',
    component: CodeView,
  },
  {
    path: '',
    component: TopicView,
  },
];

/* Animations */
export const CODE_ROUTE_ANIMATIONS: AnimationTriggerMetadata[] = [

];

/* Define our providers */
export const CODE_ROUTING_PROVIDERS: any[] = [

];

export const CodeRoutingModule = RouterModule.forChild(CODE_ROUTES);
