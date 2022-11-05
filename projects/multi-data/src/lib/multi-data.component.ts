import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';

@Component({
  selector: 'lib-multi-data',
  templateUrl: './multi-data.component.html',
  styleUrls: ['./multi-data.component.scss']
})
export class MultiDataComponent implements OnInit {

  echarts1 = echarts;

  private date: string[] = [];
  private data: { name: string, value: (string | number)[] }[] = [];
  private data1: { name: string, value: (string | number)[] }[] = [];

  now = new Date(1997, 9, 3);
  oneDay = 24 * 3600 * 1000;
  value = Math.random() * 1000;

  enable = true;

  chartOption: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      // formatter: (params: { name: string, value: string[] }[]) => {
      //   const param = params[0];
      //   var date = new Date(param.name);
      //   return (
      //     date.getDate() +
      //     '/' +
      //     (date.getMonth() + 1) +
      //     '/' +
      //     date.getFullYear() +
      //     ' : ' +
      //     param.value[1]
      //   );
      // },
      axisPointer: {
        animation: false
      }
    },
    title: {
      text: 'Dynamic Data & Time Axis'
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
      type: 'time',
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      splitLine: {
        show: false
      }
    },
    series: [
      {
        name: 'Fake Data',
        type: 'line',
        showSymbol: false,
        data: this.data,
      },
      {
        name: 'Fake Data',
        type: 'line',
        showSymbol: false,
        data: this.data1,
      }
    ]
  };
  echartsInstance: any;

  randomData(data1 = false) {
    this.now = new Date(+this.now + this.oneDay);
    this.value = this.value + Math.random() * 21 - 10;
    return {
      name: this.now.toString(),
      value: [
        [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'),
        data1 ? Math.round(this.value - 200) : Math.round(this.value)
      ]
    };
  }

  constructor() {
    for (var i = 0; i < 1000; i++) {
      this.data.push(this.randomData());
      this.data1.push(this.randomData(true));
    }
  }

  ngOnInit(): void {
    setInterval(() => {
      for (var i = 0; i < 5; i++) {
        this.data.shift();
        this.data1.shift();
        this.data.push(this.randomData());
        this.data1.push(this.randomData(true));
      }

      this.echartsInstance.setOption({
        series: [
          {
            data: this.data
          },
          {
            data: this.data1
          }
        ]
      });
    }, 1000);
  }

  onChartInit(ec: any) {
    this.echartsInstance = ec;
  }

}
