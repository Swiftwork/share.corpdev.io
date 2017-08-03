import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ArticleService, IArticle } from '../../services/article.service';

import { BaseView } from '../../../core/base/base.view';

@Component({
  selector: 'v-articles',
  templateUrl: './articles.view.html',
  styleUrls: ['./articles.view.css'],
  host: {
    '[class.v-articles]': 'true',
  },
})
export class ArticlesView extends BaseView {

  public articles: Observable<IArticle[]>;

  constructor(
    public articleService: ArticleService,
    public route: ActivatedRoute,
  ) {
    super();
    this.articles = this.route.data.pluck('articles');
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
