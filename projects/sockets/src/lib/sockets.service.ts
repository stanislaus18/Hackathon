import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketsService {

  constructor(private socket: Socket) { }

  sendMessage(type = 'ENERGY', msg?: any) {
    this.socket.emit(type, msg);
  }

  close() {
    this.socket.disconnect();
  }

  getMessage(type: string) {
    return this.socket.fromEvent(type);
  }

  public userPing(userName: string): void {
    this.sendMessage(userName);
  }
}
