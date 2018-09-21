import { ActivatedRoute } from "@angular/router";
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { LocalService } from "./../../../../../services/localservice";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-fwoverview",
  templateUrl: "./fwoverview.component.html",
  styleUrls: ["./fwoverview.component.scss"]
})
export class FwoverviewComponent implements OnInit {
  nSelectTab = 0;
  lineChart: AmChart;
  nTotal = 100;
  nBlocked = 0;
  nAllowedIP = 0;
  nForwardedIP = 0;

  private weekData = [];
  private monthData = [];
  private yearData = [];
  private gateway_id;

  constructor(
    private localService: LocalService,
    private AmCharts: AmChartsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.gateway_id = this.route.snapshot.paramMap.get("id");
  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.initLineChart();
  }

  onTabSelect(aSelTabNo: number) {
    this.nSelectTab = aSelTabNo;
    this.changeFirewallChart();
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
          lineColor: "#ff0000",
          lineThickness: 2,
          negativeLineColor: "#ff0000",
          type: "smoothedLine",
          valueField: field1
        },
        {
          id: "g2",
          bullet: "round",
          bulletSize: 8,
          lineColor: "#00ff00",
          lineThickness: 2,
          negativeLineColor: "#00ff00",
          type: "smoothedLine",
          valueField: field2
        },
        {
          id: "g3",
          bullet: "round",
          bulletSize: 8,
          lineColor: "#0000ff",
          lineThickness: 2,
          negativeLineColor: "#0000ff",
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
      "linechart_firewall",
      "started",
      "stopped",
      "restarted"
    );

    this.localService
      .getGatewayDetailFWOVerview(this.gateway_id)
      .subscribe(resData => {
        this.AmCharts.updateChart(this.lineChart, () => {
          this.nBlocked = resData.IP_Address.Blocked;
          this.nAllowedIP = resData.IP_Address.Allowed;
          this.nForwardedIP = resData.IP_Address.Forwarded;
          var servicesLine = resData.Firewall;
          this.setWeeklyData(servicesLine);
          this.setMonthlyData(servicesLine);
          this.setYearlyData(servicesLine);
          this.changeFirewallChart();
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

  changeFirewallChart() {
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
