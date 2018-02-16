import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { AppState } from '../../app.state';
import { ContentService } from '../../core/services/content.service';
import { SocketService } from '../../core/services/socket.service';
import { IArticle } from '../articles/shared/article.service';

export interface ITopic {
  id?: string,
  title?: string,
  order?: number,
  articles?: string[] | IArticle[],
}

@Injectable()
export class TopicService extends ContentService<ITopic> {

  constructor(
    protected http: HttpClient,
    protected socketService: SocketService,
    protected appState: AppState,
  ) {
    super('topics', http, socketService, appState);
    this.get().subscribe(this.storeData);
  }

  public getAllNested(): Observable<{} | ITopic | ITopic[]> {
    return this.http.get(`/api/topics/nested/`)
      .map((topics: ITopic[]) => {
        return topics.map(topic => this.format(topic));
      })
      .catch(this.handleError);
  }

  protected format(topic: ITopic): ITopic {
    return topic;
  }
}
