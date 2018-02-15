import { registerLocaleData } from '@angular/common';
import { ApplicationRef, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { createInputTransfer, createNewHosts, removeNgStyles } from '@angularclass/hmr';
import { NgComponentsModule } from '@evry/ng-components';
import { NgCoreModule } from '@evry/ng-core';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AppState, InternalStateType } from './app.state';

/* Locales */
import localeEN from '@angular/common/locales/en';
import localeSV from '@angular/common/locales/sv';

// the second parameter 'fr' is optional
registerLocaleData(localeEN, 'en');
registerLocaleData(localeSV, 'sv');

export function AppStateFactory(appState: AppState) {
  return appState.get('locale') || 'sv';
}

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void,
};

@NgModule({
  imports: [

    /*=== ANGULAR MODULES ===*/
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,

    /*=== OTHER MODULES ===*/
    LazyLoadImageModule,

    /*=== APP MODULES ===*/
    NgCoreModule.forRoot(),
    NgComponentsModule.forRoot(),
    AppRoutingModule,
    CoreModule.forRoot(),
    SharedModule.forRoot(),
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    AppState,
    {
      provide: LOCALE_ID,
      deps: [AppState],
      useFactory: AppStateFactory,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState,
  ) { }

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    /**
     * Set state
     */
    this.appState.state = store.state;
    /**
     * Set input values
     */
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    /**
     * Save state
     */
    const state = this.appState.state;
    store.state = state;
    /**
     * Recreate root elements
     */
    store.disposeOldHosts = createNewHosts(cmpLocation);
    /**
     * Save input values
     */
    store.restoreInputValues = createInputTransfer();
    /**
     * Remove styles
     */
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    /**
     * Display new elements
     */
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
