import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';
import { ActivatedRouteSnapshot, Resolve, Route, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';

import { AuthView } from './shared/views/auth/auth.view';
/* Views */

/* Routing modules */
import { CodeModule } from './pages/code/code.module';

/* Routing factories */
export function codeRoutingFactory() { return CodeModule; }

/* Router */
export const APP_ROUTES: Routes = [
  {
    path: 'login',
    component: AuthView,
  },
  {
    path: 'code',
    loadChildren: codeRoutingFactory,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'code',
  },
];

/* Animations */
export const APP_ROUTE_ANIMATIONS: AnimationTriggerMetadata[] = [

];

/* Define our providers */
export const APP_ROUTING_PROVIDERS: any[] = [

];

export const AppRoutingModule = RouterModule.forRoot(APP_ROUTES);
