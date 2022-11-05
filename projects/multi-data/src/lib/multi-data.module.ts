import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { SocketsModule } from 'projects/sockets/src/public-api';
import { MultiDataComponent } from './multi-data.component';

@NgModule({
  declarations: [
    MultiDataComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SocketsModule,
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
  ],
  exports: [
    MultiDataComponent
  ]
})
export class MultiDataModule { }
