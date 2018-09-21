import { BaThemeConfigProvider } from "./../../../../theme/theme.configProvider";
import { ActivatedRoute } from "@angular/router";
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { Component, OnInit } from "@angular/core";
import { LocalService } from "../../../../services/localservice";

@Component({
  selector: "app-gwdoverview",
  templateUrl: "./gwdoverview.component.html",
  styleUrls: ["./gwdoverview.component.scss"]
})
export class GwdoverviewComponent implements OnInit {
  nSelectTab = 2;
  private lineChartNet: AmChart;
  private lineChartSysPerformance: AmChart;
  private weekData = [];
  private monthData = [];
  private yearData = [];
  private gateway_id;

  constructor(
    private _baConfig: BaThemeConfigProvider,
    private AmCharts: AmChartsService,
    private localService: LocalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.gateway_id = this.route.snapshot.paramMap.get("id");
  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.initChart();
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

  initChart() {
    this.lineChartNet = this.makeLineChart(
      "linechart_network",
      "send",
      "receive",
      "error"
    );
    this.lineChartSysPerformance = this.makeLineChart(
      "linechart_system",
      "disk",
      "cpu",
      "memory"
    );
    this.localService
      .getGatewayDetailOverview(this.gateway_id)
      .subscribe(resData => {
        this.AmCharts.updateChart(this.lineChartNet, () => {
          var netConns = resData.Network_Connections;
          var sendValues = netConns.Send["Series"];
          var receiveValues = netConns.Receive["Series"];
          var errorValues = netConns.Error["Series"];
          var genlabels = netConns.Error["Labels"];
          var providerData = [];

          for (var i = 0; i < genlabels.length; i++) {
            providerData.push({
              label: genlabels[i],
              send: sendValues[i],
              receive: receiveValues[i],
              error: errorValues[i]
            });
          }
          this.lineChartNet.dataProvider = providerData;
          var systemPerforms = resData.System_Performance;

          this.setWeeklyData(systemPerforms);
          this.setMonthlyData(systemPerforms);
          this.setYearlyData(systemPerforms);
          this.changeSysPeformanceChart();
        });
      });
  }

  setWeeklyData(sysPerforms: any) {
    var _weekData = sysPerforms["Week"];
    var diskValues = _weekData.Disk["Series"];
    var cpuValues = _weekData.CPU["Series"];
    var memoryValues = _weekData.Memory["Series"];
    var genlabels = _weekData.Disk["Labels"];

    this.weekData = [];
    for (var i = 0; i < genlabels.length; i++) {
      this.weekData.push({
        label: genlabels[i],
        disk: diskValues[i],
        cpu: cpuValues[i],
        memory: memoryValues[i]
      });
    }
  }

  setMonthlyData(sysPerforms: any) {
    var _monthData = sysPerforms["Month"];
    var diskValues = _monthData.Disk["Series"];
    var cpuValues = _monthData.CPU["Series"];
    var memoryValues = _monthData.Memory["Series"];
    var genlabels = _monthData.Disk["Labels"];
    this.monthData = [];
    for (var i = 0; i < genlabels.length; i++) {
      this.monthData.push({
        label: genlabels[i],
        disk: diskValues[i],
        cpu: cpuValues[i],
        memory: memoryValues[i]
      });
    }
  }

  setYearlyData(sysPerforms: any) {
    var _yearData = sysPerforms["Year"];
    var diskValues = _yearData.Disk["Series"];
    var cpuValues = _yearData.CPU["Series"];
    var memoryValues = _yearData.Memory["Series"];
    var genlabels = _yearData.Disk["Labels"];
    this.yearData = [];
    for (var i = 0; i < genlabels.length; i++) {
      this.yearData.push({
        label: genlabels[i],
        disk: diskValues[i],
        cpu: cpuValues[i],
        memory: memoryValues[i]
      });
    }
  }

  changeSysPeformanceChart() {
    this.AmCharts.updateChart(this.lineChartSysPerformance, () => {
      switch (this.nSelectTab) {
        case 0:
          this.lineChartSysPerformance.dataProvider = this.weekData;
          break;
        case 1:
          this.lineChartSysPerformance.dataProvider = this.monthData;
          break;
        case 2:
          this.lineChartSysPerformance.dataProvider = this.yearData;
          break;
      }
    });
  }

  onTabSelect(aSelTabNo: number) {
    this.nSelectTab = aSelTabNo;
    this.changeSysPeformanceChart();
  }
}
