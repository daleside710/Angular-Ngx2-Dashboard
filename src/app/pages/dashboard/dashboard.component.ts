import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ElementRef} from '@angular/core';

import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from "ng-chartist/dist/chartist.component";


import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";

import { DevicesService } from '../../services/devices.service';



declare var require: any;
const data: any = require('../../shared/data/chartist.json');

export interface Chart {
    type: ChartType;
    data: Chartist.IChartistData;
    options?: any;
    responsiveOptions?: any;
    events?: ChartEvent;
}



@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit, AfterViewInit, OnDestroy {
  // private _chart: AmChart;

  // ngAfterViewInit() {
  //   this._chart = this._chartService.makeChart("chartdiv", {
  //     "type": "serial",
  //     "theme": "light",
  //     "dataProvider": []
  //   });
  // }

  // ngOnDestroy() {
  //   if (this._chart) {
  //     this._chartService.destroyChart(this._chart);
  //   }
  // }


  public connectedDevices: number = 0;
  public authenticatedDevices: number = 0;
  public expiringCerts: number = 0;

  public options: any;
  private chart2: AmChart;
  private timer: number;
  private _numbersRefresher: number;

  constructor(private elRef: ElementRef,
              private _devicesService: DevicesService,
              private AmCharts: AmChartsService) {
  }

  ngOnInit() {
    this._getDevicesCount();
    this._numbersRefresher = setInterval(() => {
      this._getDevicesCount();
    }, 15000);
  }

  private _getDevicesCount() {
    this._devicesService.getDevicesCount()
      .then((devices: any) => {
        this.connectedDevices = devices.connected;
        this.authenticatedDevices = devices.authenticated;
        this.expiringCerts = devices.expiring;
      });
  }

  makeRandomDataProvider() {
    const dataProvider = [];

    // Generate random data
    for (let year = 1950; year <= 2005; ++year) {
      dataProvider.push({
        year: '' + year,
        value: Math.floor(Math.random() * 100) - 50
      });
    }

    return dataProvider;
  }

  makeOptions(dataProvider) {
    return {
      'type': 'serial',
      'theme': 'light',
      'marginTop': 0,
      'marginRight': 80,
      'dataProvider': dataProvider,
      'valueAxes': [{
        'axisAlpha': 0,
        'position': 'left'
      }],
      'graphs': [{
        'id': 'g1',
        'balloonText': '[[category]]<br><b><span style=\'font-size:14px;\'>[[value]]</span></b>',
        'bullet': 'round',
        'bulletSize': 8,
        'lineColor': '#d1655d',
        'lineThickness': 2,
        'negativeLineColor': '#637bb6',
        'type': 'smoothedLine',
        'valueField': 'value'
      }],
      'chartScrollbar': {
        'graph': 'g1',
        'gridAlpha': 0,
        'color': '#888888',
        'scrollbarHeight': 55,
        'backgroundAlpha': 0,
        'selectedBackgroundAlpha': 0.1,
        'selectedBackgroundColor': '#888888',
        'graphFillAlpha': 0,
        'autoGridCount': true,
        'selectedGraphFillAlpha': 0,
        'graphLineAlpha': 0.2,
        'graphLineColor': '#c2c2c2',
        'selectedGraphLineColor': '#888888',
        'selectedGraphLineAlpha': 1
      },
      'chartCursor': {
        'categoryBalloonDateFormat': 'YYYY',
        'cursorAlpha': 0,
        'valueLineEnabled': true,
        'valueLineBalloonEnabled': true,
        'valueLineAlpha': 0.5,
        'fullWidth': true
      },
      'dataDateFormat': 'YYYY',
      'categoryField': 'year',
      'categoryAxis': {
        'minPeriod': 'YYYY',
        'parseDates': true,
        'minorGridAlpha': 0.1,
        'minorGridEnabled': true
      },
      'export': {
        'enabled': false
      }
    };
  }

  ngAfterViewInit() {
    // Create chartdiv1
    this.options = this.makeOptions(this.makeRandomDataProvider());

    // Create chartdiv2
    this.chart2 = this.AmCharts.makeChart('chartdiv', this.makeOptions(this.makeRandomDataProvider()));

    // this.timer = setInterval(() => {
      // Update chartdiv1
      this.options = this.makeOptions(this.makeRandomDataProvider());

      // Update chartdiv2
      this.AmCharts.updateChart(this.chart2, () => {
        this.chart2.dataProvider = this.makeRandomDataProvider();
      });
    // }, 3000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);

    // Cleanup chartdiv2
    if (this.chart2) {
      this.AmCharts.destroyChart(this.chart2);
    }

    if (this._numbersRefresher) {
      clearInterval(this._numbersRefresher);
    }

  }

    // Line with Area Chart 1 Starts
    lineArea1: Chart = {
        type: 'Line',
        data: data['lineAreaWeek'],
        options: {
            low: 0,
            showArea: true,
            fullWidth: true,
            onlyInteger: true,
            axisY: {
                low: 0,
                scaleMinSpace: 50,
            },
            axisX: {
                showGrid: false,
                minWidth:50,  
            },
            chartPadding: { top: 0, right: 45, bottom: 0, left: 0 },
        },
    };
    // Line with Area Chart 1 Ends

  //graph time click event function
  GetGraphByYMD(event, type: string) {
    this.setGraphByTime(type);
    this.SetButtonYMDActive(event);
  }

  SetButtonYMDActive(event){
      var hElement: HTMLElement = this.elRef.nativeElement;
      var allAnchors = hElement.querySelectorAll('.ymd-button-group label');

      //do something with selected elements
      [].forEach.call(allAnchors, function (item: HTMLElement) {
        //item.setAttribute('class', 'chart-time-option');
        item.setAttribute('class', 'ymd-label');

      });

      //set active class for selected item 
      event.currentTarget.setAttribute('class', 'ymd-label active');

    }

  setGraphByTime(type:string) {
    if(type==="week")
    {
      this.lineArea1.data = data['lineAreaWeek'];
    }
    else if(type==="month")
    {
      this.lineArea1.data = data['lineAreaMonth'];
    }
    else if(type==="year")
    {
      this.lineArea1.data = data['lineAreaYear'];
    }
  }
}
