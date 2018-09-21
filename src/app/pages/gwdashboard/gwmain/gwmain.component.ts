import { BaThemeConfigProvider } from "./../../../theme/theme.configProvider";
import { Subscription } from "rxjs/Rx";
import { Component, OnInit, ElementRef, OnDestroy } from "@angular/core";
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import { LocalService } from "../../../services/localservice";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-gwmain",
  templateUrl: "./gwmain.component.html",
  styleUrls: ["./gwmain.component.scss"]
})
export class GwmainComponent implements OnInit {
  private lineChartNetPerformance: AmChart;
  private pieChartGateStatus: AmChart;
  private dataGatewayList: any[] = [];
  private subGateway: Subscription;
  private subGatewayStatus: Subscription;
  private subGatewayNetPerform: Subscription;

  rowsOnPage = 6;
  nStatusHigh = 0;
  nStatusMedium = 0;
  nStatusLow = 0;
  public map: any;
  public iconNormal = L.icon({
    iconUrl: "./assets/raphaellayer/images/icon_normal.png",
    iconSize: [25, 33], // size of the icon
    iconAnchor: [12, 33], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -26]
  });

  public iconMali = L.icon({
    iconUrl: "./assets/raphaellayer/images/icon_malicious.png",
    iconSize: [25, 33], // size of the icon
    iconAnchor: [12, 33], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -16]
  });
  public iconSuspi = L.icon({
    iconUrl: "./assets/raphaellayer/images/icon_suspicious.png",
    iconSize: [25, 33], // size of the icon
    iconAnchor: [12, 33], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -16]
  });

  constructor(
    private _baConfig: BaThemeConfigProvider,
    private _elementRef: ElementRef,
    private AmCharts: AmChartsService,
    private localService: LocalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.initMap();
    this.initNetPerformanceChart();
    this.initGateStatusChart();
  }

  ngOnDestroy() {
    this.subGateway.unsubscribe();
    this.subGatewayNetPerform.unsubscribe();
    this.subGatewayStatus.unsubscribe();
  }

  public onGatewaySelectItem(value: any) {
    //this.router.navigate(['/detail', {foo: 123}], {relativeTo: this.route});
    //console.log(this.route.parent);
    this.router.navigate(["gwdetail", value.Device], {
      relativeTo: this.route.parent
    });
  }

  initMap() {
    let el = this._elementRef.nativeElement.querySelector(".leaflet-maps");

    L.Icon.Default.imagePath = "./assets/raphaellayer/images/";
    this.map = L.map(el).setView([1.35415, 103.828034], 12.2);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.subGateway = this.localService.getGateways().subscribe(resData => {
      this.dataGatewayList = resData.values;
      for (var i = 0; i < this.dataGatewayList.length; i++) {
        var _strPop =
          "IP: " +
          this.dataGatewayList[i]["Ip"] +
          "<br>" +
          "Device: " +
          this.dataGatewayList[i]["Device"] +
          "<br>" +
          "Model: " +
          this.dataGatewayList[i]["Model"] +
          "<br>" +
          "Status: " +
          this.dataGatewayList[i]["Status"] +
          "<br>" +
          "Device Connected: " +
          this.dataGatewayList[i]["Connected_Devices"] +
          "<br>" +
          "Last Seen: " +
          this.dataGatewayList[i]["Last_Seen"] +
          "<br>" +
          "Latitiude: " +
          this.dataGatewayList[i]["Lat"] +
          "<br>" +
          "Longitude: " +
          this.dataGatewayList[i]["Long"] +
          "<br>";
        var iconMarker = this.iconNormal;
        if (this.dataGatewayList[i]["Status"] == "Malicious")
          iconMarker = this.iconMali;
        if (this.dataGatewayList[i]["Status"] == "Suspicious")
          iconMarker = this.iconSuspi;

        L.marker(
          [this.dataGatewayList[i]["Lat"], this.dataGatewayList[i]["Long"]],
          { icon: iconMarker }
        )
          .addTo(this.map)
          .bindPopup(_strPop);
      }
    });
  }

  initNetPerformanceChart() {
    this.lineChartNetPerformance = this.AmCharts.makeChart(
      "linechart_netperform",
      {
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
            valueField: "send"
          },
          {
            id: "g2",
            bullet: "round",
            bulletSize: 8,
            lineColor: this._baConfig.get().colors.chartGreen,
            lineThickness: 2,
            negativeLineColor: this._baConfig.get().colors.chartGreen,
            type: "smoothedLine",
            valueField: "receive"
          },
          {
            id: "g3",
            bullet: "round",
            bulletSize: 8,
            lineColor: this._baConfig.get().colors.chartYellow,
            lineThickness: 2,
            negativeLineColor: this._baConfig.get().colors.chartYellow,
            type: "smoothedLine",
            valueField: "error"
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
      }
    );

    this.subGatewayNetPerform = this.localService
      .getNetPerformance()
      .subscribe(resData => {
        this.AmCharts.updateChart(this.lineChartNetPerformance, () => {
          //this.lineChartNetPerformance.dataProvider = resData.data;
          var sendValues = resData.Send["Series"];
          var receiveValues = resData.Receive["Series"];
          var errorValues = resData.Error["Series"];
          var genlabels = resData.Error["Labels"];
          var providerData = [];

          for (var i = 0; i < genlabels.length; i++) {
            providerData.push({
              label: i,
              send: sendValues[i],
              receive: receiveValues[i],
              error: errorValues[i]
            });
          }
          this.lineChartNetPerformance.dataProvider = providerData;
        });
      });
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
      labelText: "",
      percentPrecision: 1
    };
  }

  initGateStatusChart() {
    this.pieChartGateStatus = this.AmCharts.makeChart(
      "piechart_gatewaystatus",
      this.makePieChartOption([])
    );
    this.subGatewayStatus = this.localService
      .getGatewayStatus()
      .subscribe(resData => {
        this.AmCharts.updateChart(this.pieChartGateStatus, () => {
          this.nStatusHigh = resData.High;
          this.nStatusMedium = resData.Medium;
          this.nStatusLow = resData.Low;
          this.pieChartGateStatus.dataProvider = [
            {
              name: "High",
              value: this.nStatusHigh,
              color: this._baConfig.get().colors.chartRed
            },
            {
              name: "Medium",
              value: this.nStatusMedium,
              color: this._baConfig.get().colors.chartYellow
            },
            {
              name: "Low",
              value: this.nStatusLow,
              color: this._baConfig.get().colors.chartGreen
            }
          ];
        });
      });
  }
}
