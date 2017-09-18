import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

export interface IProfileResponse {
  email: string,
  name: string,
}

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
  ) {

  }

  public get(id: string): Observable<{} | IProfileResponse> {
    return this.http.get(id ? `/api/users/${id}` : `/api/users/`)
      .catch(this.handleError.bind(this));
  }

  handleError(error: any) {
    console.error(error);
    return Observable.of<{} | IProfileResponse>(null);
  }
}
