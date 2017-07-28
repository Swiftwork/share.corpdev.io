import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';
import { ActivatedRouteSnapshot, Resolve, Route, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { CodeModule } from './pages/code/code.module';

/* Views */

/* Routing modules */

/* Router */
export const APP_ROUTES: Routes = [
  {
    path: 'code',
    loadChildren: () => CodeModule,
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
