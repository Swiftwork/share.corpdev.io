import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

export interface ILoginParams {
  email: string,
  password: string,
}

export interface ILoginResponse {
  token: string,
  user: {
    id: string,
    email: string,
    name: string,
  },
}

@Injectable()
export class AuthService {

  constructor(
    private httpClient: HttpClient,
  ) {

  }

  login(params: ILoginParams): Observable<{} | ILoginResponse> {
    return this.httpClient.post('/api/login', params)
      .map((response: ILoginResponse) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        return response;
      })
      .catch(this.handleError.bind(this));
  }

  handleError(error: any) {
    console.error(error);
    return Observable.of<{} | ILoginResponse>(null);
  }
}
