import { Component, HostBinding, OnInit } from '@angular/core';
import { BaseComponent } from '../../../core/base/base.decorator';

export interface IArticleLink {
  title: string,
  route: string,
}

export interface ITopicLink {
  title: string,
  route: string,
  articles: IArticleLink[],
}

@BaseComponent({
  selector: 'c-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

  public title: string;
  public topicLinks: ITopicLink[];

  constructor() {
    this.title = 'code';
    this.topicLinks = SidebarComponent.MockNavigation();
  }

  ngOnInit() { }

  static MockNavigation(): ITopicLink[] {
    return [
      {
        title: 'Evry Modules', route: '/topic/evry-modules', articles: [
          { title: 'Installing', route: '/topic/evry-modules/installing' },
          { title: 'Testing', route: '/topic/evry-modules/testing' },
        ],
      },
      {
        title: 'CSS Guidelines', route: '/topic/evry-modules', articles: [
          { title: 'Installing', route: '/topic/evry-modules/installing' },
          { title: 'Testing', route: '/topic/evry-modules/testing' },
        ],
      },
      {
        title: 'Frameworks', route: '/topic/evry-modules', articles: [
          { title: 'Installing', route: '/topic/evry-modules/installing' },
          { title: 'Testing', route: '/topic/evry-modules/testing' },
        ],
      },
      {
        title: 'Transpilation', route: '/topic/evry-modules', articles: [
          { title: 'Installing', route: '/topic/evry-modules/installing' },
          { title: 'Testing', route: '/topic/evry-modules/testing' },
        ],
      },
    ];
  }

}
