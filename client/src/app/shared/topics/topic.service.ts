import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { SocketService } from '../../core/services/socket.service';
import { IArticle } from '../articles/shared/article.service';

import { AppState } from '../../app.state';

export interface ITopic {
  id: string,
  title: string,
  route: string,
  articles: IArticle[],
}

@Injectable()
export class TopicService {

  private _topics: BehaviorSubject<Map<string, ITopic>> = new BehaviorSubject<Map<string, ITopic>>(
    new Map<string, ITopic>(),
  );
  public topics: Observable<Map<string, ITopic>> = this._topics.asObservable();

  constructor(
    private http: HttpClient,
    private socketService: SocketService,
    private appState: AppState,
  ) {
    this.initSocket();

    /* Bind */
    this.storeTopics = this.storeTopics.bind(this);
    this.handleError = this.handleError.bind(this);

    this.get().subscribe(this.storeTopics);
  }

  private initSocket() {
    this.socketService.socket.on('topics', (topicId: string) => {
      const cached = this._topics.getValue();
      cached.delete(topicId);
      this.get(topicId).subscribe(this.storeTopics);
    });
  }

  public add(title: string): Observable<{} | ITopic> {
    return this.http.post(`/api/topics/`, { title: title })
      .catch(this.handleError);
  }

  public get(id?: string): Observable<{} | ITopic | ITopic[]> {
    const cached = this._topics.getValue();
    if (cached.has(id))
      return Observable.of(cached.get(id));
    return this.http.get(id ? `/api/topics/${id}` : `/api/topics/`)
      .map(this.storeTopics)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error(error);
    return Observable.of<{} | ITopic | ITopic[]>(null);
  }

  private storeTopics(data: ITopic | ITopic[]) {
    const cached = this._topics.getValue();
    if (Array.isArray(data)) {
      const topics = data as ITopic[];
      (topics as ITopic[]).forEach(topic => {
        topic.route = this.formatRoute(topic);
        cached.set(topic.id, topic);
      });
    } else {
      const topic = data as ITopic;
      topic.route = this.formatRoute(topic);
      cached.set(topic.id, topic);
    }
    this._topics.next(cached);
    return data;
  }

  private formatRoute(topic: ITopic) {
    return `/${this.appState.get('instance')}/topic/${topic.id}`;
  }
}
