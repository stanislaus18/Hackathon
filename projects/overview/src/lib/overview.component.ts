import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { OverviewService } from './overview.service';

@Component({
  selector: 'lib-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  private date: string[] = [];
  private data: number[] = [];
  enable = false;

  // chartOption: EChartsOption = {
  //   xAxis: {
  //     type: 'category',
  //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  //   },
  //   yAxis: {
  //     type: 'value',
  //   },
  //   series: [
  //     {
  //       data: [820, 932, 901, 934, 1290, 1330, 1320],
  //       type: 'line',
  //     },
  //   ],
  // };

  chartOption: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      position: (pt: any) => {
        return [pt[0], '10%'];
      }
    },
    title: {
      left: 'center',
      text: 'Electricity Consumtion from past 7 days'
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
      type: 'category',
      boundaryGap: false,
      data: this.date
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%']
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 10
      },
      {
        start: 0,
        end: 10
      }
    ],
    series: [
      {
        name: 'Fake Data',
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        itemStyle: {
          color: 'rgb(255, 70, 131)'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(255, 158, 68)'
            },
            {
              offset: 1,
              color: 'rgb(255, 70, 131)'
            }
          ])
        },
        data: this.data
      }
    ]
  };

  constructor(private overviewService: OverviewService) { }

  ngOnInit(): void {
    this.overviewService.getMonthlyData().subscribe(data => {
      data.forEach((d: { _time: string, _value: string }) => {
        this.date.push(d._time);
        this.data.push(Number(d._value));
      });
      this.enable = true;
    });
  }

}
