import { NgModule } from '@angular/core';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { SocketsComponent } from './sockets.component';

const config: SocketIoConfig = { url: 'http://localhost:5222', options: {} };

@NgModule({
  declarations: [
    SocketsComponent
  ],
  imports: [
    SocketIoModule.forRoot(config)
  ],
  exports: [
    SocketsComponent
  ]
})
export class SocketsModule { }
