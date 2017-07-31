import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '_debugger';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import { ITopic } from '../components/topic/topic.component';

@Injectable()
export class TopicsService {

  constructor(
    private authHttp: AuthHttp,
  ) {

  }

  public get(id?: string): Observable<{} | ITopic | ITopic[]> {
    return this.authHttp.get(id ? `/api/topics/${id}` : `/api/topics/`)
      .map((response, index) => {
        return response.json() || {};
      })
      .catch(this.handleError.bind(this));
  }

  handleError(error: any) {
    console.error(error);
  }
}
