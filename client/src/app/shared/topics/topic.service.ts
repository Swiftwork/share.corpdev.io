import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IArticle } from '../articles/shared/article.service';

import { AppState } from '../../app.state';
import { ContentService, SocketService } from '../../core';

export interface ITopic {
  id: string,
  title: string,
  route: string,
  articles: IArticle[],
}

@Injectable()
export class TopicService extends ContentService<ITopic> {

  constructor(
    protected http: HttpClient,
    protected socketService: SocketService,
    protected appState: AppState,
  ) {
    super('topics', http, socketService, appState);
  }

  protected format(topic: ITopic): ITopic {
    topic.route = `/${this.appState.get('instance')}/topic/${topic.id}`;
    return topic;
  }
}
