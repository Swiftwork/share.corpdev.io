import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ArticleService, IArticle } from '../../services/article.service';

import { BaseView } from '../../../core/base/base.view';

@Component({
  selector: 'v-topic',
  templateUrl: './topic.view.html',
  styleUrls: ['./topic.view.css'],
  host: {
    '[class.v-topic]': 'true',
  },
})
export class TopicView extends BaseView {

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
