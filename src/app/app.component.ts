import { Component } from '@angular/core';
import { KtdGridLayout, ktdTrackById } from '@katoid/angular-grid-layout';
import { SocketsService } from 'projects/sockets/src/public-api';

const IOT_DATA = ['ENERGY', 'AC', 'TV', 'LIGHTS', 'FRIDGE'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hackathon';

  cols: number = 6;
  rowHeight: number = 100;
  layout: KtdGridLayout = [
    { id: '0', x: 0, y: 0, w: 2.95, h: 4.1 },
    { id: '1', x: 3, y: 0, w: 2.95, h: 4.1 },
    { id: '2', x: 0, y: 3, w: 2.95, h: 4.1, minW: 2, minH: 3 },
    // { id: '3', x: 3, y: 3, w: 3, h: 3, minW: 2, maxW: 3, minH: 2, maxH: 5 },
  ];
  trackById = ktdTrackById

  onLayoutUpdated(event : any) {}

  constructor(private socketService: SocketsService) {}

  ngOnInit() {
    // initiate 
    IOT_DATA.forEach(e => this.socketService.sendMessage(e));
  }
}
