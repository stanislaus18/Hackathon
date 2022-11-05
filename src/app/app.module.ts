import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KtdGridModule } from '@katoid/angular-grid-layout';
import { OverviewModule } from 'projects/overview/src/public-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { AggregatedDataModule } from 'projects/aggregated-data/src/public-api';
import { MultiDataModule } from 'projects/multi-data/src/public-api';
import { SocketsModule } from 'projects/sockets/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KtdGridModule,
    OverviewModule,
    HttpClientModule,
    AggregatedDataModule,
    MultiDataModule,
    SocketsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
