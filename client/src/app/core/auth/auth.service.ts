import { Observable } from 'rxjs/Rx';
import { Response } from '_debugger';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthHttp } from 'angular2-jwt';

export interface ILoginParams {
  email: string,
  password: string,
}

export interface ILoginResponse {
  email: string,
  name: string,
  token: string,
}

@Injectable()
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private authHttp: AuthHttp,
  ) {

  }

  login(params: ILoginParams): Observable<any> {
    return this.httpClient.post('/api/login', params)
      .map(this.handleSuccess.bind(this))
      .catch(this.handleError.bind(this))
  }

  handleSuccess(response: ILoginResponse) {
    localStorage.setItem('token', response.token);
    return response;
  }

  handleError(error: any) {
    console.error(error);
  }
}