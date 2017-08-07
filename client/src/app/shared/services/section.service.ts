
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '_debugger';
import { BehaviorSubject, Observable, Subject } from 'rxjs/Rx';
import { AppState } from '../../app.state';
import { SocketService } from '../../core/services/socket.service';
import { ISection } from './section.service';

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
    private appState: AppState,
  ) {
    this.initSocket();

    /* Bind */
    this.storeSections = this.storeSections.bind(this);
    this.handleError = this.handleError.bind(this);

    this.get().subscribe(this.storeSections);
  }

  private initSocket() {
    this.socketService.socket.on('sections', (sectionId: string) => {
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
      const sections = data as ISection[];
      (sections as ISection[]).forEach(section => {
        cached.set(section.id, section);
      });
    } else {
      const section = data as ISection;
      cached.set(section.id, section);
    }
    this._sections.next(cached);
    return data;
  }
}
