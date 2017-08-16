import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AppState } from '../../../app.state';
import { ArticleService, IArticle } from '../../services/article.service';
import { ITopic, TopicService } from '../../services/topic.service';

export interface IArticleLink {
  title: string,
  route: string,
}

@Component({
  selector: 'c-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  host: {
    '[class.c-sidebar]': 'true',
  },
})
export class SidebarComponent implements OnInit {

  public title: string;
  public topics: ITopic[];
  public topicsState = {
    model: '',
    creating: false,
  };
  public articlesState = {
    articles: [] as IArticle[],
    model: '',
    creating: false,
  };

  constructor(
    public router: Router,
    public topicsService: TopicService,
    public articlesService: ArticleService,
    public appState: AppState,
  ) {
    this.title = 'code';
    this.topicsService.topics.subscribe((topics) => {
      this.topics = Array.from(topics.values());
    });
  }

  ngOnInit() { }

  /*=== EDITING ===*/

  onStartEdit() {
    this.appState.set('editing', true);
  }

  onEndEdit(save: boolean) {
    this.appState.set('editing', false);
  }

  /*=== TOPICS ===*/

  toggleCreateTopic() {
    this.topicsState.creating = !this.topicsState.creating;
  }

  createTopic(title: string) {
    this.topicsState.creating = false;
    this.topicsService.add(title).subscribe();
  }

  /*=== ARTICLES ===*/

  toggleCreateArticle() {
    this.articlesState.creating = !this.articlesState.creating;
  }

  createArticle(title: string) {
    this.articlesState.creating = false;
    this.articlesService.add(title).subscribe();
  }

  getArticle(id: string) {
    return this.articlesService.get(id);
  }
}
