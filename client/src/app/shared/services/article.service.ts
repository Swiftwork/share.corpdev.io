import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { AppState } from '../../app.state';
import { SocketService } from '../../core/services/socket.service';
import { ISection } from './section.service';

export interface IArticle {
  date: Date,
  id: string,
  image: string,
  preamble: string,
  route: string,
  tags: string[],
  title: string,
  sections: ISection[],
}

@Injectable()
export class ArticleService {

  private _articles: BehaviorSubject<Map<string, IArticle>> = new BehaviorSubject<Map<string, IArticle>>(
    new Map<string, IArticle>(),
  );
  public articles: Observable<Map<string, IArticle>> = this._articles.asObservable();

  constructor(
    private http: HttpClient,
    private socketService: SocketService,
    private appState: AppState,
  ) {
    this.initSocket();

    /* Bind */
    this.storeArticles = this.storeArticles.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  private initSocket() {
    this.socketService.socket.on('articles', (articleId: string) => {
      const cached = this._articles.getValue();
      cached.delete(articleId);
      this.get(articleId).subscribe(this.storeArticles);
    });
  }

  public add(title: string): Observable<{} | IArticle> {
    return this.http.post(`/api/articles/`, { title: title })
      .catch(this.handleError);
  }

  public get(id?: string): Observable<{} | IArticle | IArticle[]> {
    const cached = this._articles.getValue();
    if (cached.has(id))
      return Observable.of(cached.get(id));
    return this.http.get(id ? `/api/articles/${id}` : `/api/articles/`)
      .map(this.storeArticles)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error(error);
    return Observable.of<{} | IArticle | IArticle[]>(null);
  }

  private storeArticles(data: IArticle | IArticle[]) {
    const cached = this._articles.getValue();
    if (Array.isArray(data)) {
      const articles = data as IArticle[];
      (articles as IArticle[]).forEach(article => {
        article.route = this.formatRoute(article);
        cached.set(article.id, article);
      });
    } else {
      const article = data as IArticle;
      article.route = this.formatRoute(article);
      cached.set(article.id, article);
    }
    this._articles.next(cached);
    return data;
  }

  private formatRoute(article: IArticle) {
    return `/${this.appState.get('instance')}/article/${article.id}`;
  }
}
