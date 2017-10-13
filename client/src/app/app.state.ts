import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

export type InternalStateType = {
  [key: string]: any,
};

const store = new BehaviorSubject<InternalStateType>({
  // INITIAL STATE
});

@Injectable()
export class AppState {

  public store = store;

  constructor() {
    store
      .asObservable()
      .distinctUntilChanged()
      .do(changes => console.log('new state', changes)); // log new state
  }

  public get state() {
    return store.getValue();
  }

  public set state(state) {
    store.next(state);
  }

  public get(prop?: any): any {
    return this.state[prop];
  }

  public set(prop: string, value: any): Observable<any> {
    const state = this._clone(this.state);
    state[prop] = value;
    this.state = state;
    return this.get(prop);
  }

  private _clone(object: InternalStateType) {
    return JSON.parse(JSON.stringify(object));
  }
}
