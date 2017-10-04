import { AnimationTriggerMetadata } from '@angular/animations';
import { Route, RouterModule, Routes, UrlMatchResult, UrlSegment, UrlSegmentGroup } from '@angular/router';

import { ArticleResolver } from './shared/articles/shared/article.resolver';
import { SectionResolver } from './shared/sections/shared/section.resolver';

import { AuthComponent } from './core/auth/auth.component';
import { ArticlesComponent } from './shared/articles/articles.component';
import { AssetsComponent } from './shared/assets/assets.component';
import { CodeComponent } from './shared/code/code.component';
import { SectionsComponent } from './shared/sections/sections.component';

export const PAGES = ['code'];

export function ROUTE_MATCHER(segments: UrlSegment[], group: UrlSegmentGroup, route: Route): UrlMatchResult {
  return segments.length > 0 && PAGES.includes(segments[0].path) ? ({ consumed: segments }) : null;
}

/* Router */
export const ROUTES: Routes = [
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'code',
    //matcher: ROUTE_MATCHER,
    children: [
      {
        path: 'topic/:id',
        component: ArticlesComponent,
        resolve: {
          articles: ArticleResolver,
        },
      },
      {
        path: 'article/:id',
        component: SectionsComponent,
        resolve: {
          sections: SectionResolver,
        },
      },
      {
        path: 'assets',
        component: AssetsComponent,
      },
      {
        path: 'code',
        component: CodeComponent,
      },
      {
        path: '',
        component: ArticlesComponent,
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'code',
  },
];

/* Animations */
export const ROUTE_ANIMATIONS: AnimationTriggerMetadata[] = [

];

/* Define our providers */
export const ROUTING_PROVIDERS: any[] = [

];

export const RoutingModule = RouterModule.forRoot(ROUTES);
