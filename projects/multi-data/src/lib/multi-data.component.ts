import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { SocketsService } from 'projects/sockets/src/public-api';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

interface IMultiGraphData {
  name: string;
  value: (string | number)[];
}

UntilDestroy()
@Component({
  selector: 'lib-multi-data',
  templateUrl: './multi-data.component.html',
  styleUrls: ['./multi-data.component.scss']
})
export class MultiDataComponent implements OnInit {

  private energyData: IMultiGraphData[] = [];
  private acData: IMultiGraphData[] = [];
  private tvData: IMultiGraphData[] = [];
  private fridgeData: IMultiGraphData[] = [];
  private lightsData: IMultiGraphData[] = [];

  chartOption: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        animation: false
      }
    },
    title: {
      text: 'Live : Electric consumption data '
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
        name: 'Current Electricity Consumption Data',
        type: 'line',
        showSymbol: false,
        data: this.energyData,
      },
      {
        name: 'Current AC Consumption',
        type: 'line',
        showSymbol: false,
        data: this.acData,
      },
      {
        name: 'Current TV Consumption',
        type: 'line',
        showSymbol: false,
        data: this.tvData,
      },
      {
        name: 'Current LIGHTS Consumption',
        type: 'line',
        showSymbol: false,
        data: this.lightsData,
      },
      {
        name: 'Current FRIDGE Consumption',
        type: 'line',
        showSymbol: false,
        data: this.fridgeData,
      },
    ]
  };
  echartsInstance: any;
  enable = false;


  constructor(private socketsService: SocketsService) {}

  ngOnInit(): void {
    this.getDataViaSocket();
  }

  setUpdatedData() {
    this.echartsInstance?.setOption({
      series: [
        {
          data: this.energyData
        },
        {
          data: this.acData
        },
        {
          data: this.tvData
        },
        {
          data: this.lightsData
        },
        {
          data: this.fridgeData
        }
      ]
    });
  }

  onChartInit(ec: any) {
    this.echartsInstance = ec;
  }

  iotData(data: any): IMultiGraphData {
    const date = new Date(data.timestamp);
    return {
      name: date.toISOString(),
      value: [
        [date.toISOString()].join('/'),
        data.value
      ]
    };
  }

  getDataViaSocket() {
    let eCount = 0;
    let acCount = 0;
    let tvCount = 0;
    let fCount = 0;
    let lCount = 0;

    this.socketsService.getMessage('ENERGY')
      //.pipe(untilDestroyed(this))
      .subscribe((energyData) => {
        eCount > 10 ? this.energyData.shift() : eCount++;
        this.energyData.push(this.iotData(energyData));
        this.setUpdatedData();
        this.enable = true;
      });

    this.socketsService.getMessage('AC')
      //.pipe(untilDestroyed(this))
      .subscribe((acData) => {
        acCount > 10 ? this.acData.shift() : acCount++;
        this.acData.push(this.iotData(acData));
        this.setUpdatedData();
      });

    this.socketsService.getMessage('TV')
      //.pipe(untilDestroyed(this))
      .subscribe((tvData) => {
        tvCount > 10 ? this.tvData.shift() : tvCount++;
        this.tvData.push(this.iotData(tvData));
        this.setUpdatedData();
      });

    this.socketsService.getMessage('FRIDGE')
      //.pipe(untilDestroyed(this))
      .subscribe((fridgeData) => {
        fCount > 10 ? this.fridgeData.shift() : fCount++;
        this.fridgeData.push(this.iotData(fridgeData));
        this.setUpdatedData();
      });

    this.socketsService.getMessage('LIGHTS')
     // .pipe(untilDestroyed(this))
      .subscribe((lightsData) => {
        lCount > 10 ? this.lightsData.shift() : lCount++;
        this.lightsData.push(this.iotData(lightsData));
        this.setUpdatedData();
      });
  }

}
