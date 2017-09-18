import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

@Injectable()
export class SocketService {

  public socket: SocketIOClient.Socket;

  constructor(
  ) {
    this.socket = io(`http://${window.location.host}`);
    this.socket.on('connect', () => {
      console.log('Connected to server');
    });
  }
}
