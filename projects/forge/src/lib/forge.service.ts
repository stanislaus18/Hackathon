import { Injectable } from '@angular/core';
import { SocketsService } from 'projects/sockets/src/public-api';
import { EMPTY, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgeService {
  constructor(private socketsService: SocketsService) { }

  getMessage(type: string) {
    if (type === 'AC') {
      return this.socketsService.getMessage('AC_SWITCH');
    }

    if (type === 'TV') {
      return this.socketsService.getMessage('TV_SWITCH');
    }

    if (type === 'LIGHTS') {
      return this.socketsService.getMessage('LIGHTS_SWITCH');
    }

    if (type === 'FRIDGE') {
      return this.socketsService.getMessage('FRIDGE_SWITCH');
    }

    return EMPTY;
  }
}
