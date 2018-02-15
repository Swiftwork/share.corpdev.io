import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { SocketService } from '../../../core/services/socket.service';

export interface ISection {
  date: Date,
  id: string,
  body: string,
}

export interface IOperations {
  save?: ISection[],
  edit?: any[],
  destroy?: ISection[],
}

@Injectable()
export class SectionService {

  private _sections: BehaviorSubject<Map<string, ISection>> = new BehaviorSubject<Map<string, ISection>>(
    new Map<string, ISection>(),
  );
  public sections: Observable<Map<string, ISection>> = this._sections.asObservable();

  constructor(
    private http: HttpClient,
    private socketService: SocketService,
  ) {
    this.initSocket();

    /* Bind */
    this.storeSections = this.storeSections.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  private initSocket() {
    this.socketService.socket.on('sections', (sectionId: string) => {
      const cached = this._sections.getValue();
      cached.delete(sectionId);
      this.get(sectionId).subscribe(this.storeSections);
    });
  }

  public add(section: ISection): Observable<{} | ISection> {
    return this.http.post(`/api/sections/`, section)
      .catch(this.handleError);
  }

  public operations(operations: IOperations): Observable<{} | ISection> {
    return this.http.post(`/api/sections/operations/`, operations)
      .catch(this.handleError);
  }

  public get(id?: string): Observable<{} | ISection | ISection[]> {
    const cached = this._sections.getValue();
    if (cached.has(id))
      return Observable.of(cached.get(id));
    return this.http.get(id ? `/api/sections/${id}` : `/api/sections/`)
      .map(this.storeSections)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error(error);
    return Observable.of<{} | ISection | ISection[]>(null);
  }

  private storeSections(data: ISection | ISection[]) {
    const cached = this._sections.getValue();
    if (Array.isArray(data)) {
      data.forEach(section => {
        cached.set(section.id, section);
      });
    } else {
      cached.set(data.id, data);
    }
    this._sections.next(cached);
    return data;
  }
}
