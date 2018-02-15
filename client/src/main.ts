import { enableProdMode, NgModuleRef, ViewEncapsulation } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ENVIRONMENT } from './environments/environment';

import { AppModule } from './app/app.module';

import './styles/index.css';

if (!ENVIRONMENT.DEBUG) {
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
    .bootstrapModule(AppModule, { defaultEncapsulation: ViewEncapsulation.None });
}

/**
 * If document is already loaded bootstrap application else
 * add event listener. Loading has already occured with
 * hot module replacement.
 */
if (document.readyState === 'loading')
  document.addEventListener('DOMContentLoaded', main, false);
else
  main().catch((err) => {
    console.error(err);
  });
