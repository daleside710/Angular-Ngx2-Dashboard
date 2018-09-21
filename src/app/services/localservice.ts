import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { environment } from "environments/environment";

@Injectable()
export class LocalService {
  private mainUrl = "http://107.150.28.231:9200/api/v1/gateway/";
  constructor(private http: HttpClient) {
    //this.getJSON().subscribe(data => {
    //console.log(data);
    //});
  }

  //gatewayPath: String = "/gateway";

  public getHeader(): HttpHeaders {
    let username: string = "max";
    let password: string = "Microsec185";
    let headers = new HttpHeaders();
    headers = headers.append(
      "Authorization",
      "Basic " + btoa(username + ":" + password)
    );
    headers = headers.append(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    return headers;
  }

  public getGateways(): Observable<any> {
    return this.http.get(this.mainUrl + "dashboard/map/", {
      headers: this.getHeader()
    });
    //return this.http.get("./assets/json/gateways.json");
  }

  public getGatewayStatus(): Observable<any> {
    return this.http.get(this.mainUrl + "dashboard/status/", {
      headers: this.getHeader()
    });
    //return this.http.get("./assets/json/gateway_status.json");
  }

  public getNetPerformance(): Observable<any> {
    return this.http.get(this.mainUrl + "dashboard/network/", {
      headers: this.getHeader()
    });
    //return this.http.get("./assets/json/net_performance.json");
  }

  public getGatewayDetail(gID): Observable<any> {
    return this.http.get(this.mainUrl + "details/P2242/details/", {
      headers: this.getHeader()
    });
    //return this.http.get("./assets/json/gateway_detail.json");
    //details/P2242/details/
    //return this.http.get( environment.apiUrl + this.gatewayPath + "/dashboard/network");
  }

  public getGatewayDetailTopAlertStatus(gID): Observable<any> {
    return this.http.get(this.mainUrl + "details/P2242/top_alerts_status/", {
      headers: this.getHeader()
    });
    //return this.http.get("./assets/json/gateway_detail_networkcon.json");
    //etails/P2242/top_alerts_status/
    //return this.http.get( environment.apiUrl + this.gatewayPath + "/dashboard/network");
  }

  public getGatewayDetailOverview(gID): Observable<any> {
    return this.http.get(this.mainUrl + "details/P2242/overview/", {
      headers: this.getHeader()
    });
    //return this.http.get("./assets/json/gateway_detail_overview.json");
    //details/P2242/overview/
    //return this.http.get( environment.apiUrl + this.gatewayPath + "/dashboard/network");
  }

  public getGatewayDetailNetConns(gID): Observable<any> {
    return this.http.get(
      this.mainUrl + "details/P2242/network_connections/connections/",
      {
        headers: this.getHeader()
      }
    );
    //return this.http.get("./assets/json/gateway_detail_networkcon.json");
    //P2242/network_connections/overview/
    //return this.http.get( environment.apiUrl + this.gatewayPath + "/dashboard/network");
  }

  public getGatewayDetailSSOverview(gID): Observable<any> {
    return this.http.get(
      this.mainUrl + "details/P2242/system_services/overview/",
      {
        headers: this.getHeader()
      }
    );
    //return this.http.get("./assets/json/gateway_detail_ssoverview.json");
    //return this.http.get( environment.apiUrl + this.gatewayPath + "/dashboard/network");
  }

  public getGatewayDetailSSExisting(gID): Observable<any> {
    return this.http.get(
      this.mainUrl + "details/P2242/system_services/existing/",
      {
        headers: this.getHeader()
      }
    );
    //return this.http.get("./assets/json/gateway_detail_ssexisting.json");
    //return this.http.get( environment.apiUrl + this.gatewayPath + "/dashboard/network");
  }
  public getGatewayDetailFWOVerview(gID): Observable<any> {
    return this.http.get(this.mainUrl + "details/P2242/firewall/overview/", {
      headers: this.getHeader()
    });
    //return this.http.get("./assets/json/gateway_detail_fwoverview.json");
    //P2242/firewall/overview/
    //return this.http.get( environment.apiUrl + this.gatewayPath + "/dashboard/network");
  }
  public getGatewayDetailFWExisting(gID): Observable<any> {
    //return this.http.get("./assets/json/gateway_detail_fwexisting.json");
    return this.http.get(this.mainUrl + "details/P2242/firewall/existing/", {
      headers: this.getHeader()
    });

    //P2242/firewall/existing/
    //return this.http.get( environment.apiUrl + this.gatewayPath + "/dashboard/network");
  }

  makeRandomDataProvider() {
    const dataProvider = [];

    // Generate random data
    for (let year = 2000; year <= 2005; ++year) {
      dataProvider.push({
        year: "" + year,
        value: Math.floor(Math.random() * 100) - 50
      });
    }

    return dataProvider;
  }
}
//The above getLine1JSON and method random data is not required
//public getLine1JSON(): Observable<any> {
//return this.http.get( environment.apiUrl + this.gatewayPath + "/dashboard/network");
//}
