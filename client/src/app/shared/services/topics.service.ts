import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '_debugger';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { ITopic } from '../components/topic/topic.component';

import * as io from 'socket.io-client';

@Injectable()
export class TopicsService {

  private _topics: BehaviorSubject<ITopic[]> = new BehaviorSubject<ITopic[]>([]);
  public topics: Observable<ITopic[]> = this._topics.asObservable();

  private socket: SocketIOClient.Socket;

  constructor(
    private http: HttpClient,
  ) {
    this.initSocket();
    this.get().subscribe(topics => {
      this._topics.next(topics as ITopic[]);
    });
  }

  private initSocket() {
    this.socket = io(`http://${window.location.host}`);
    this.socket.on('topics', (topicId: string) => {
      this.get(topicId).subscribe((response) => {
        if (Array.isArray(response)) {
          this._topics.next(response);
        } else {
          const topics = this._topics.getValue().slice(0);
          const index = topics.findIndex(topic => topic.id === topicId);

          if (index > 0) {
            topics.splice(index, 0, response as ITopic);
            this._topics.next(topics);

          } else {
            topics.push(response as ITopic);
            this._topics.next(topics);
          }
        }
      });
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

  handleError(error: any) {
    console.error(error);
    return Observable.of<{} | ITopic | ITopic[]>(null);
  }
}
