import { BaThemeConfigProvider } from "./../../../../theme/theme.configProvider";
import { AmChart } from "@amcharts/amcharts3-angular";
import { AmChartsService } from "@amcharts/amcharts3-angular";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "gwdsimplepie",
  templateUrl: "./gwdsimplepie.component.html",
  styleUrls: ["./gwdsimplepie.component.scss"]
})
export class GwdsimplepieComponent implements OnInit {
  @Input()
  pieTitle: String;
  @Input()
  subTitle: String;
  _nTotal: number;
  @Input()
  set nTotal(value: number) {
    this._nTotal = value;
    this.refreshPieChart();
  }
  _nValue: number;
  @Input()
  set nValue(value: number) {
    this._nValue = value;
    this.refreshPieChart();
  }

  @Input()
  pieID: string;

  private pieChart: AmChart;
  constructor(
    private _baConfig: BaThemeConfigProvider,
    private AmCharts: AmChartsService
  ) {}

  ngOnInit() {}
  ngAfterViewInit() {
    this.refreshPieChart();
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }

  makePieChartOption(dataProvider) {
    return {
      type: "pie",
      theme: "light",
      dataProvider: dataProvider,
      valueField: "value",
      titleField: "name",
      colorField: "color",
      balloon: {
        fixedPosition: true
      },
      outlineColor: "",
      pullOutRadius: 0,
      labelRadius: -10,
      radius: "42%",
      innerRadius: "60%",
      labelText: "", //[[name]]
      percentPrecision: 1
    };
  }

  refreshPieChart() {
    this.pieChart = this.AmCharts.makeChart(
      this.pieID,
      this.makePieChartOption([])
    );
    this.AmCharts.updateChart(this.pieChart, () => {
      this.pieChart.dataProvider = [
        {
          name: "Total",
          value: this._nTotal,
          color: this._baConfig.get().colors.chartRed
        },
        {
          name: "Value",
          value: this._nValue,
          color: this._baConfig.get().colors.chartYellow
        }
      ];
    });
  }
}
