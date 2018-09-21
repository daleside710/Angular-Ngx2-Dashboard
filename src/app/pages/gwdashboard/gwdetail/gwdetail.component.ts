import { BaThemeConfigProvider } from "./../../../theme/theme.configProvider";
import { AmChart, AmChartsService } from "@amcharts/amcharts3-angular";
import { LocalService } from "./../../../services/localservice";
import { Component, OnInit, ElementRef } from "@angular/core";
import { Router, ActivatedRoute, ParamMap, RouterEvent } from "@angular/router";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

@Component({
  selector: "app-gwdetail",
  templateUrl: "./gwdetail.component.html",
  styleUrls: ["./gwdetail.component.scss"]
})
export class GwdetailComponent implements OnInit {
  gateway_status = "Normal";
  public gateway_id;
  public gatewayItem: any;
  public map: any;
  strDevice = "";
  strModel = "";
  fLatitude = 0;
  fLongitude = 0;
  strIP = "";
  strOS = "";
  strVersion = "";
  strServerIP = "";
  strLSDate = "";
  strLSTime = "";
  strTimeZone = "";
  strCountry = "";

  nStatusHigh = 0;
  nStatusMedium = 0;
  nStatusLow = 0;
  nAlerts = 0;
  nSelectTab = 0;
  private pieChartGateStatus: AmChart;

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
    private router: Router,
    private localService: LocalService,
    private route: ActivatedRoute,
    private AmCharts: AmChartsService
  ) {}

  ngOnInit() {
    // this.gateway_id = this.route.paramMap.switchMap((params: ParamMap) =>
    //   params.get("gwId")
    // );
    this.gateway_id = this.route.snapshot.paramMap.get("id");
  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.initMap();
    this.initGateStatusChart();
  }
  onTabSelect(aSelTab: number) {
    this.nSelectTab = aSelTab;
    let routeVal = "";
    switch (aSelTab) {
      case 0:
        routeVal = "overview";
        break;
      case 1:
        routeVal = "firewall";
        break;
      case 2:
        routeVal = "systemservices";
        break;
      case 3:
        routeVal = "networkconnection";
        break;
    }
    this.router.navigate([routeVal], {
      relativeTo: this.route.parent
    });
  }

  initMap() {
    let el = this._elementRef.nativeElement.querySelector(".detail-map");

    L.Icon.Default.imagePath = "./assets/raphaellayer/images/";
    this.map = L.map(el).setView([1.35415, 103.828034], 12.2);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.localService.getGatewayDetail(this.gateway_id).subscribe(resData => {
      this.gatewayItem = resData;
      this.strDevice = resData["Devices"];
      this.strModel = resData["Model"];
      this.fLatitude = resData["Lat"];
      this.fLongitude = resData["Long"];
      this.strIP = resData["IP Address"];
      this.strOS = resData["OS"];
      this.strVersion = resData["Version"];
      this.strServerIP = resData["Server IP"];
      this.gateway_status = resData["Status"];
      var _lastSeenValues = resData["Last Seen"].split(" ");
      this.strLSDate = _lastSeenValues[0];
      this.strLSTime = _lastSeenValues[1];
      var _timezone = resData["Time Zone"].split("/");
      this.strTimeZone = _timezone[0];
      this.strCountry = _timezone[1];

      var iconMarker = this.iconNormal;
      if (this.gatewayItem["Status"] == "Malicious") iconMarker = this.iconMali;
      if (this.gatewayItem["Status"] == "Suspicious")
        iconMarker = this.iconSuspi;

      L.marker([this.gatewayItem["Lat"], this.gatewayItem["Long"]], {
        icon: iconMarker
      }).addTo(this.map);
      this.map.setView(
        [this.gatewayItem["Lat"], this.gatewayItem["Long"]],
        12.2
      );
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
    this.localService
      .getGatewayDetailTopAlertStatus(this.gateway_id)
      .subscribe(resData => {
        this.AmCharts.updateChart(this.pieChartGateStatus, () => {
          this.nStatusHigh = resData.Alert.High;
          this.nStatusMedium = resData.Alert.Medium;
          this.nStatusLow = resData.Alert.Low;
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
