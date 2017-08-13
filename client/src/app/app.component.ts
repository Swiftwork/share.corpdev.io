import { Component, OnInit } from '@angular/core';
import { PRIMARY_OUTLET, Router, RoutesRecognized } from '@angular/router';
import { AppState } from './app.state';

@Component({
  selector: 'm-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '[class.m-app]': 'true',
  },
})
export class AppComponent implements OnInit {

  constructor(
    public router: Router,
    public appState: AppState,
  ) {
    this.router.events.subscribe((route) => {
      if (route instanceof RoutesRecognized) {
        const tree = this.router.parseUrl(route.url === '/' ? route.urlAfterRedirects : route.url);
        const group = tree.root.children[PRIMARY_OUTLET];
        if (group) {
          const instance = group.segments[0];
          const view = group.segments[1];
          this.appState.set('instance', instance ? instance.path : null);
          this.appState.set('view', view ? view.path : null);
        }
      }
    });
  }

  ngOnInit() { }
}
