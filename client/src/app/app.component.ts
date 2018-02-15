import { Component, ElementRef, ViewChild } from '@angular/core';
import { PRIMARY_OUTLET, Router, RoutesRecognized } from '@angular/router';

import { AppState } from './app.state';

@Component({
  selector: 'c-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '[class.c-app]': 'true',
  },
})
export class AppComponent {

  @ViewChild('topbar') topbar: ElementRef;
  @ViewChild('sidebar') sidebar: ElementRef;

  constructor(
    public router: Router,
    public appState: AppState,
  ) {
    this.router.events.subscribe((route) => {
      switch (route.constructor) {
        case RoutesRecognized:
          this.updateStatePath(route as RoutesRecognized);
          break;
      }
    });
  }

  updateStatePath(route: RoutesRecognized) {
    const tree = this.router.parseUrl(route.url === '/' ? route.urlAfterRedirects : route.url);
    const group = tree.root.children[PRIMARY_OUTLET];
    if (group) {
      const instance = group.segments[0];
      const view = group.segments[1];
      this.appState.set('instance', instance ? instance.path : null);
      this.appState.set('view', view ? view.path : null);
    }
  }
}
