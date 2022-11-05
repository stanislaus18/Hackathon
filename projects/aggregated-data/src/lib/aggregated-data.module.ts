import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { AggregatedDataComponent } from './aggregated-data.component';

@NgModule({
  declarations: [
    AggregatedDataComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
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
    AggregatedDataComponent
  ]
})
export class AggregatedDataModule { }
