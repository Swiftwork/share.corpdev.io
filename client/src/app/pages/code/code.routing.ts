import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';
import { ActivatedRouteSnapshot, Resolve, Route, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { ArticleResolver } from '../../shared/services/article.resolver';
import { ArticleView } from '../../shared/views/article/article.view';
import { ArticlesView } from '../../shared/views/articles/articles.view';

/* Views */

/* Routing modules */

/* Router */
export const CODE_ROUTES: Routes = [
  {
    path: 'topic/:id',
    component: ArticlesView,
    resolve: {
      articles: ArticleResolver,
    },
  },
  {
    path: 'article/:id',
    component: ArticleView,
  },
  {
    path: '',
    component: ArticlesView,
  },
];

/* Animations */
export const CODE_ROUTE_ANIMATIONS: AnimationTriggerMetadata[] = [

];

/* Define our providers */
export const CODE_ROUTING_PROVIDERS: any[] = [

];

export const CodeRoutingModule = RouterModule.forChild(CODE_ROUTES);
