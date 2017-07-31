import { enableProdMode, NgModuleRef, ViewEncapsulation } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import './styles/index.css';

if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}

/**
 * Bootstrap our Angular app with a top level NgModule.
 * This will automatically be replaced with platform
 * browser in an ahead-of-time environment.
 */
export function main(): Promise<void | NgModuleRef<AppModule>> {
  document.removeEventListener('DOMContentLoaded', main, false);
  return platformBrowserDynamic()
    .bootstrapModule(AppModule, { defaultEncapsulation: ViewEncapsulation.None })
    .catch((err) => console.error(err));
}

/**
 * If document is already loaded bootstrap application else
 * add event listener. Loading has already occured with
 * hot module replacement.
 */
switch (document.readyState) {
  case 'loading':
    document.addEventListener('DOMContentLoaded', main, false);
    break;
  case 'interactive':
  case 'complete':
  default:
    main();
}
