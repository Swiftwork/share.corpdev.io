import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { ArticleService, IArticle } from './shared/article.service';

import { AppState } from '../../app.state';

@Component({
  selector: 'c-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  host: {
    '[class.c-articles]': 'true',
  },
})
export class ArticlesComponent {

  public articles: Observable<IArticle[]>;

  public state = {
    editing: false,
    model: '',
    //dragging: null as ITopic,
    creating: false,
  };

  constructor(
    public articleService: ArticleService,
    public route: ActivatedRoute,
    public appState: AppState,
  ) {
    this.articles = this.route.data.pluck('articles');
  }

  ngOnInit() {
    this.appState.store.pluck('editing').subscribe((editingState: boolean) => {
      this.state.editing = editingState;
    });
  }

  /*=== DRAGGABLE ===*/

  toggleCreateArticle() {
    this.state.creating = !this.state.creating;
  }

  createArticle(title: string) {
    this.state.creating = false;
    this.articleService.add(title).subscribe();
  }
}
