import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { ContentService, IContent } from '../../core/services/content.service';

import { AppState } from '../../app.state';
import { SocketService } from '../../core/services/socket.service';
import { ISection } from './section.service';

export interface IArticle extends IContent {
  date: Date,
  image: string,
  preamble: string,
  route: string,
  tags: string[],
  title: string,
  sections: ISection[],
}

@Injectable()
export class ArticleService extends ContentService<IArticle> {

  constructor(
    protected http: HttpClient,
    protected socketService: SocketService,
    protected appState: AppState,
  ) {
    super(http, socketService, appState);
    this.initSocket('articles');
  }

  public add(title: string): Observable<{} | IArticle> {
    return this.http.post(`/api/articles/`, { title: title })
      .catch(this.handleError);
  }

  public get(id?: string): Observable<{} | IArticle | IArticle[]> {
    const cached = this._store.getValue();
    if (cached.has(id))
      return Observable.of(cached.get(id));
    return this.http.get(id ? `/api/articles/${id}` : `/api/articles/`)
      .map(this.storeData)
      .catch(this.handleError);
  }

  protected format(article: IArticle): IArticle {
    article.route = `/${this.appState.get('instance')}/article/${article.id}`;
    return article;
  }
}
