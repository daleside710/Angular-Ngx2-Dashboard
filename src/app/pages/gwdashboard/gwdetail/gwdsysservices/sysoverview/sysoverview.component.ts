import { BaThemeConfigProvider } from "./../../../../../theme/theme.configProvider";
import { ActivatedRoute, Router } from "@angular/router";
import { LocalService } from "./../../../../../services/localservice";
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sysoverview",
  templateUrl: "./sysoverview.component.html",
  styleUrls: ["./sysoverview.component.scss"]
})
export class SysoverviewComponent implements OnInit {
  dataTop10 = [];
  rowsOnPage = 10;

  nTotal = 100;
  nStartedValue = 50;
  nStoptedValue = 20;
  nRestartedValue = 80;

  nSelectTab = 0;

  lineChart: AmChart;
  private weekData = [];
  private monthData = [];
  private yearData = [];
  public gateway_id;

  constructor(
    private _baConfig: BaThemeConfigProvider,
    private AmCharts: AmChartsService,
    private localService: LocalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.gateway_id = this.route.snapshot.paramMap.get("id");
  }

  onTabSelect(aSelTabNo: number) {
    this.nSelectTab = aSelTabNo;
    this.changeSysPeformanceChart();
  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.initLineChart();
  }

  makeLineChart(
    chartName: string,
    field1: string,
    field2: string,
    field3: string
  ): AmChart {
    return this.AmCharts.makeChart(chartName, {
      type: "serial",
      theme: "light",
      marginTop: 0,
      marginRight: 0,
      dataProvider: [],
      valueAxes: [
        {
          axisAlpha: 1,
          position: "left",
          labelsEnabled: false,
          color: "#ffffff",
          gridAlpha: 0
        }
      ],
      pathToImages: "http://cdn.amcharts.com/lib/3/images/",
      graphs: [
        {
          id: "g1",
          bullet: "round",
          bulletSize: 8,
          lineColor: this._baConfig.get().colors.chartRed,
          lineThickness: 2,
          negativeLineColor: this._baConfig.get().colors.chartRed,
          type: "smoothedLine",
          valueField: field1
        },
        {
          id: "g2",
          bullet: "round",
          bulletSize: 8,
          lineColor: this._baConfig.get().colors.chartGreen,
          lineThickness: 2,
          negativeLineColor: this._baConfig.get().colors.chartGreen,
          type: "smoothedLine",
          valueField: field2
        },
        {
          id: "g3",
          bullet: "round",
          bulletSize: 8,
          lineColor: this._baConfig.get().colors.chartYellow,
          lineThickness: 2,
          negativeLineColor: this._baConfig.get().colors.chartYellow,
          type: "smoothedLine",
          valueField: field3
        }
      ],
      chartCursor: {
        cursorAlpha: 0,
        valueLineEnabled: true,
        valueLineBalloonEnabled: true,
        valueLineAlpha: 0.5,
        fullWidth: true
      },
      categoryField: "label",
      categoryAxis: {
        axisAlpha: 1.0,
        minorGridAlpha: 0.1,
        minorGridEnabled: false,
        gridAlpha: 0,
        labelsEnabled: false
      },
      export: {
        enabled: false
      }
    });
  }

  initLineChart() {
    this.lineChart = this.makeLineChart(
      "linechart_service",
      "started",
      "stopped",
      "restarted"
    );

    this.localService
      .getGatewayDetailSSOverview(this.gateway_id)
      .subscribe(resData => {
        this.AmCharts.updateChart(this.lineChart, () => {
          this.dataTop10 = resData.Services_List;
          var servicesLine = resData.Services_Line;
          this.setWeeklyData(servicesLine);
          this.setMonthlyData(servicesLine);
          this.setYearlyData(servicesLine);
          this.changeSysPeformanceChart();
        });
      });
  }

  setWeeklyData(servicesLine: any) {
    var _weekData = servicesLine["Week"];
    var startValues = _weekData.Started["Series"];
    var stoppedValues = _weekData.Stopped["Series"];
    var restartedValues = _weekData.Restarted["Series"];
    var genlabels = _weekData.Started["Labels"];
    this.weekData = [];
    for (var i = 0; i < genlabels.length; i++) {
      this.weekData.push({
        label: genlabels[i],
        started: startValues[i],
        stopped: stoppedValues[i],
        restarted: restartedValues[i]
      });
    }
  }

  setMonthlyData(servicesLine: any) {
    var _monthData = servicesLine["Month"];
    var startValues = _monthData.Started["Series"];
    var stoppedValues = _monthData.Stopped["Series"];
    var restartedValues = _monthData.Restarted["Series"];
    var genlabels = _monthData.Started["Labels"];
    this.monthData = [];
    for (var i = 0; i < genlabels.length; i++) {
      this.monthData.push({
        label: genlabels[i],
        started: startValues[i],
        stopped: stoppedValues[i],
        restarted: restartedValues[i]
      });
    }
  }

  setYearlyData(servicesLine: any) {
    var _yearData = servicesLine["Year"];
    var startValues = _yearData.Started["Series"];
    var stoppedValues = _yearData.Stopped["Series"];
    var restartedValues = _yearData.Restarted["Series"];
    var genlabels = _yearData.Started["Labels"];
    this.yearData = [];
    for (var i = 0; i < genlabels.length; i++) {
      this.yearData.push({
        label: genlabels[i],
        started: startValues[i],
        stopped: stoppedValues[i],
        restarted: restartedValues[i]
      });
    }
  }

  changeSysPeformanceChart() {
    this.AmCharts.updateChart(this.lineChart, () => {
      switch (this.nSelectTab) {
        case 0:
          this.lineChart.dataProvider = this.weekData;
          break;
        case 1:
          this.lineChart.dataProvider = this.monthData;
          break;
        case 2:
          this.lineChart.dataProvider = this.yearData;
          break;
      }
    });
  }
}
