import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { SocketService } from '../../core/services/socket.service';

import { AppState } from '../../app.state';
import { IDatabaseEvent } from '../../shared/interfaces';

export interface IContent {
  id?: string,
}

@Injectable()
export abstract class ContentService<T extends IContent> {

  protected _store: BehaviorSubject<Map<string, T>> = new BehaviorSubject<Map<string, T>>(
    new Map<string, T>(),
  );
  public store: Observable<Map<string, T>> = this._store.asObservable();

  constructor(
    protected content: string,
    protected http: HttpClient,
    protected socketService: SocketService,
    protected appState: AppState,
  ) {
    /* Bind */
    this.storeData = this.storeData.bind(this);
    this.handleError = this.handleError.bind(this);
    this.initSocket(this.content);
  }

  protected initSocket(table: string) {
    this.socketService.socket.on(table, (action: IDatabaseEvent) => {
      const cached = this._store.getValue();
      cached.delete(action.id);
      if (action.action === 'insert' || action.action === 'update')
        this.get(action.id).subscribe(this.storeData);
      else
        this._store.next(cached);
    });
  }

  public add(content: T): Observable<{} | T> {
    return this.http.post(`/api/${this.content}/`, content)
      .catch(this.handleError);
  }

  public update(id: string, content: T): Observable<{} | T> {
    return this.http.put(`/api/${this.content}/${id}`, content)
      .catch(this.handleError);
  }

  public get(id?: string): Observable<{} | T | T[]> {
    const cached = this._store.getValue();
    const ids = (id ? id : '').split(',');
    const allCached = ids.reduce((sum, value) => (!cached.has(id) ? false : sum), true);
    if (allCached) {
      if (ids.length === 1)
        return Observable.of(cached.get(id));
      else
        return Observable.of(ids.map((id) => cached.get(id)));
    }
    return this.http.get(id ? `/api/${this.content}/${id}` : `/api/${this.content}/`)
      .map(this.storeData)
      .catch(this.handleError);
  }

  protected storeData(data: T | T[]) {
    const cached = this._store.getValue();
    if (Array.isArray(data)) {
      data.forEach(content => {
        this.format(content);
        cached.set(content.id, content);
      });
    } else {
      this.format(data);
      cached.set(data.id, data);
    }
    this._store.next(cached);
    return data;
  }

  public delete(id: string): Observable<{} | T> {
    return this.http.delete(`/api/${this.content}/${id}`)
      .catch(this.handleError);
  }
  protected abstract format(content: T): T;

  protected handleError(error: any) {
    console.error(error);
    return Observable.of<{} | T | T[]>(null);
  }
}
