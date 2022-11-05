import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { AggregatedDataService } from './aggregated-data.service';

@Component({
  selector: 'lib-aggregated-data',
  templateUrl: './aggregated-data.component.html',
  styleUrls: ['./aggregated-data.component.scss']
})
export class AggregatedDataComponent implements OnInit {

  private date: string[] = [];
  private data: number[] = [];
  enable = false;

  chartOption: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      position: (pt: any) => {
        return [pt[0], '10%'];
      }
    },
    title: {
      text: 'Aggregate data',
      subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      data: this.date,
      axisLabel: {
        inside: true,
        color: '#fff'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#999'
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        data: this.data
      }
    ]
  };

  constructor(private aggregatedDataService: AggregatedDataService) { }

  ngOnInit(): void {
    this.aggregatedDataService.getAggregatedData('10h').subscribe(data => {
      data.forEach((d: { _stop: string, _value: string }) => {
        this.date.push(d._stop);
        this.data.push(Number(d._value));
      });
      this.enable = true;
    });
  }

}
