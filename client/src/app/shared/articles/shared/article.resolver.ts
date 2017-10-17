import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { ITopic, TopicService } from '../../topics/topic.service';
import { ArticleService, IArticle } from './article.service';

@Injectable()
export class ArticleResolver implements Resolve<{} | IArticle | IArticle[]> {
  constructor(
    public topicService: TopicService,
    public articleService: ArticleService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
  ): Observable<{} | IArticle | IArticle[]> {
    return this.topicService.get(route.params.id).mergeMap((topic: ITopic) => {
      if (topic.articles && topic.articles.length) {
        return this.articleService.get(topic.articles.join(',')).map((articles) => {
          if (Array.isArray(articles)) return articles;
          if (typeof articles === 'object') return [articles];
          return articles;
        });
      } else {
        return [];
      }
    });
  }
}
