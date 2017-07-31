import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '_debugger';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';

export interface IProfileResponse {
  email: string,
  name: string,
}

@Injectable()
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private authHttp: AuthHttp,
  ) {

  }

  public get(id: string): Observable<{} | IProfileResponse> {
    return this.authHttp.get(id ? `/api/users/${id}` : `/api/users/`)
      .map((response, index) => {
        return response.json() || {};
      })
      .catch(this.handleError.bind(this));
  }

  handleError(error: any) {
    console.error(error);
  }
}
