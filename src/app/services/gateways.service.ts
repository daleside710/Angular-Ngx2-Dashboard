import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { APIService } from './api.service';
import { Gateway } from '../interfaces/gateway';

@Injectable()
export class GatewaysService {

  /**
   * class constructor
   * @param (private) _api: APIService
   * @param (private) _http: Http
   */
  constructor(private _api: APIService,
              private _http: HttpClient) {
  }

  /**
   * Fetch list of gateways from server
   * @return Promise. containing an array of Gateway
   */
  public getGatewaysList(): Promise<Gateway[]> {
    return this._http
      .get(this._api.getGatewaysList())
      .toPromise()
      .then( (res: any): Gateway[] => res as Gateway[] )
      .catch(this._api.handleApiError);
  }

  /**
   * Fetch a single gateway from server by id
   * @param id:string
   * @return Promise. containing a Gateway
   */
  public getGatewayBy(id:string): Promise<Gateway> {
    return this._http
      .get(this._api.getGatewayBy(id))
      .toPromise()
      .then( (res: any): Gateway => res as Gateway )
      .catch(this._api.handleApiError);
  }

}
