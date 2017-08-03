
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '_debugger';
import { BehaviorSubject, Observable, Subject } from 'rxjs/Rx';
import { AppState } from '../../app.state';
import { SocketService } from '../../core/services/socket.service';
import { ISegment } from './segment.service';

export interface ISegment {
  date: Date,
  id: string,
  image: string,
  preamble: string,
  route: string,
  tags: string[],
  title: string,
}

@Injectable()
export class SegmentService {

  private _segments: BehaviorSubject<Map<string, ISegment>> = new BehaviorSubject<Map<string, ISegment>>(
    new Map<string, ISegment>(),
  );
  public segments: Observable<Map<string, ISegment>> = this._segments.asObservable();

  constructor(
    private http: HttpClient,
    private socketService: SocketService,
    private appState: AppState,
  ) {
    this.initSocket();

    /* Bind */
    this.storeSegments = this.storeSegments.bind(this);
    this.handleError = this.handleError.bind(this);

    this.get().subscribe(this.storeSegments);
  }

  private initSocket() {
    this.socketService.socket.on('segments', (segmentId: string) => {
      this.get(segmentId).subscribe(this.storeSegments);
    });
  }

  public add(title: string): Observable<{} | ISegment> {
    return this.http.post(`/api/segments/`, { title: title })
      .catch(this.handleError);
  }

  public get(id?: string): Observable<{} | ISegment | ISegment[]> {
    const cached = this._segments.getValue();
    if (cached.has(id))
      return Observable.of(cached.get(id));
    return this.http.get(id ? `/api/segments/${id}` : `/api/segments/`)
      .map(this.storeSegments)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error(error);
    return Observable.of<{} | ISegment | ISegment[]>(null);
  }

  private storeSegments(data: ISegment | ISegment[]) {
    const cached = this._segments.getValue();
    if (Array.isArray(data)) {
      const segments = data as ISegment[];
      (segments as ISegment[]).forEach(segment => {
        segment.route = this.formatRoute(segment);
        cached.set(segment.id, segment);
      });
    } else {
      const segment = data as ISegment;
      segment.route = this.formatRoute(segment);
      cached.set(segment.id, segment);
    }
    this._segments.next(cached);
    return data;
  }

  private formatRoute(segment: ISegment) {
    return `/${this.appState.get('instance')}/segment/${segment.id}`;
  }
}
