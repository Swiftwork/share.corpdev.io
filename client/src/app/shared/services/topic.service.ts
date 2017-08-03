import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '_debugger';
import { BehaviorSubject, Observable, Subject } from 'rxjs/Rx';
import { AppState } from '../../app.state';
import { SocketService } from '../../core/services/socket.service';
import { IArticle } from './article.service';

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
    this.get().subscribe(this.storeTopics.bind(this));
  }

  private initSocket() {
    this.socketService.socket.on('topics', (topicId: string) => {
      this.get(topicId).subscribe(this.storeTopics.bind(this));
    });
  }

  public add(title: string): Observable<{} | ITopic> {
    return this.http.post(`/api/topics/`, { title: title })
      .catch(this.handleError.bind(this));
  }

  public get(id?: string): Observable<{} | ITopic | ITopic[]> {
    return this.http.get(id ? `/api/topics/${id}` : `/api/topics/`)
      .catch(this.handleError.bind(this));
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
  }

  private formatRoute(topic: ITopic) {
    return `/${this.appState.get('instance')}/topic/${topic.id}`;
  }
}
