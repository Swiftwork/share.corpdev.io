import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ISection } from '../../sections/shared/section.service';

import { AppState } from '../../../app.state';
import { ContentService, IContent } from '../../../core/services/content.service';
import { SocketService } from '../../../core/services/socket.service';

export interface IArticle extends IContent {
  date: Date,
  image: string,
  preamble: string,
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
    super('articles', http, socketService, appState);
    this.get().subscribe();
  }

  protected format(article: IArticle): IArticle {
    return article;
  }
}
