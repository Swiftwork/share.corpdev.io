import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '_debugger';
import { BehaviorSubject, Observable, Subject } from 'rxjs/Rx';
import { AppState } from '../../app.state';
import { SocketService } from '../../core/services/socket.service';

export interface IContent {
  id: string,
}

@Injectable()
export abstract class ContentService<T extends IContent> {

  protected _store: BehaviorSubject<Map<string, T>> = new BehaviorSubject<Map<string, T>>(
    new Map<string, T>(),
  );
  public store: Observable<Map<string, T>> = this._store.asObservable();

  constructor(
    protected http: HttpClient,
    protected socketService: SocketService,
    protected appState: AppState,
  ) {
    /* Bind */
    this.storeData = this.storeData.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  protected initSocket(event: string) {
    this.socketService.socket.on(event, (contentId: string) => {
      const cached = this._store.getValue();
      cached.delete(contentId);
      this.get(contentId).subscribe(this.storeData);
    });
  }

  public abstract get(id?: string): Observable<{} | T | T[]>;

  protected storeData(data: T | T[]) {
    const cached = this._store.getValue();
    if (Array.isArray(data)) {
      const contents = data as T[];
      (contents as T[]).forEach(content => {
        const cachedContent = cached.get(content.id);
        this.format(content);
        cached.set(content.id, content);
      });
    } else {
      const content = data as T;
      const cachedContent = cached.get(content.id);
      this.format(content);
      cached.set(content.id, content);
    }
    this._store.next(cached);
    return data;
  }

  protected abstract format(content: T): T;

  protected handleError(error: any) {
    console.error(error);
    return Observable.of<{} | T | T[]>(null);
  }
}
