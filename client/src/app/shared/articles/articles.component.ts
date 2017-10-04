import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { ArticleService, IArticle } from './shared/article.service';

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

  constructor(
    public articleService: ArticleService,
    public route: ActivatedRoute,
  ) {
    this.articles = this.route.data.pluck('articles');
  }

  ngOnInit() {
  }
}
