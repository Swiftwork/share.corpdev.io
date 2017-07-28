import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';
import { ActivatedRouteSnapshot, Resolve, Route, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { TopicsView } from '../../shared/views/topics/topics.view';

/* Views */

/* Routing modules */

/* Router */
export const CODE_ROUTES: Routes = [
  {
    path: '',
    component: TopicsView,
  },
];

/* Animations */
export const CODE_ROUTE_ANIMATIONS: AnimationTriggerMetadata[] = [

];

/* Define our providers */
export const CODE_ROUTING_PROVIDERS: any[] = [

];

export const CodeRoutingModule = RouterModule.forChild(CODE_ROUTES);
