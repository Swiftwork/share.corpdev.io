import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '_debugger';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { IArticle } from '../components/article/article.component';

import * as io from 'socket.io-client';

@Injectable()
export class ArticleService {

  private _articles: BehaviorSubject<IArticle[]> = new BehaviorSubject<IArticle[]>([]);
  public articles: Observable<IArticle[]> = this._articles.asObservable();

  private socket: SocketIOClient.Socket;

  constructor(
    private http: HttpClient,
  ) {
    this.initSocket();
    this.get().subscribe(articles => {
      this._articles.next(articles as IArticle[]);
    });
  }

  private initSocket() {
    this.socket = io(`http://${window.location.host}`);
    this.socket.on('articles', (articleId: string) => {
      this.get(articleId).subscribe((response) => {
        if (Array.isArray(response)) {
          this._articles.next(response);
        } else {
          const articles = this._articles.getValue().slice(0);
          const index = articles.findIndex(article => article.id === articleId);

          if (index > 0) {
            articles.splice(index, 0, response as IArticle);
            this._articles.next(articles);

          } else {
            articles.push(response as IArticle);
            this._articles.next(articles);
          }
        }
      });
    });
  }

  public add(title: string): Observable<{} | IArticle> {
    return this.http.post(`/api/articles/`, { title: title })
      .catch(this.handleError.bind(this));
  }

  public get(id?: string): Observable<{} | IArticle | IArticle[]> {
    return this.http.get(id ? `/api/articles/${id}` : `/api/articles/`)
      .catch(this.handleError.bind(this));
  }

  handleError(error: any) {
    console.error(error);
    return Observable.of<{} | IArticle | IArticle[]>(null);
  }
}
