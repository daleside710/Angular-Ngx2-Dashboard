import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import * as moment from 'moment';

import { APIService } from './api.service';
import { Device } from '../interfaces/device';

@Injectable()
export class DevicesService {

  /**
   * class constructor
   * @param (private) _api: APIService
   * @param (private) _http: Http
   */
  constructor(private _api: APIService,
              private _http: HttpClient) {
  }

  /**
   * Fetch list of all devices from server
   * @return Promise. containing an array of Device
   */
  public getDeivcesList(): Promise<Device[]> {
    return this._http
      .get(this._api.getDevicesList())
      .toPromise()
      .then( (res: any): Device[] =>  res as Device[] )
      .catch(this._api.handleApiError);
  }

  /**
   * Fetch list of authenticated devices from server
   * @return Promise. containing an array of Device
   */
  public getAuthenticatedDeivcesList(): Promise<Device[]> {
    return this._http
      .get(this._api.getAuthenticatedDevicesList())
      .toPromise()
      .then( (res: any): Device[] => res as Device[] )
      .catch(this._api.handleApiError);
  }

  /**
   * Fetch list of unauthenticated devices from server
   * @return Promise. containing an array of Device
   */
  public getUnauthenticatedDeivcesList(): Promise<Device[]> {
    return this._http
      .get(this._api.getUnauthenticatedDevicesList())
      .toPromise()
      .then( (res: any): Device[] =>  res as Device[] )
      .catch(this._api.handleApiError);
  }

  /**
   * Fetch list of blocked devices from server
   * @return Promise. containing an array of Device
   */
  public getBlockedDeivcesList(): Promise<Device[]> {
    return this._http
      .get(this._api.getBlockedDevicesList())
      .toPromise()
      .then( (res: any): Device[] =>  res as Device[] )
      .catch(this._api.handleApiError);
  }

  /**
   * Fetch list of blocked devices from server
   * @return Promise. containing an array of Device
   */
  public manageDeviceById(id: string, option: string): Promise<Device> {
    return this._http
      .post(this._api.getManageDeviceBy(id), {"option": option})
      .toPromise()
      .then( (res: any): Device =>  res as Device )
      .catch(this._api.handleApiError);
  }


  /**
   * Fetch a total number of devices
   * @return Promise. containing an object
   *    { connected: 0, authenticated: 0, expiring: 0 }
   */
  public getDevicesCount(): Promise<{}> {
    return new Promise((resolve, reject) => {
      this.getDeivcesList()
        .then( (devices: Device[]) => {
          var connected: number = devices.length;
          var authenticated: number = 0;
          var expiring: number = 0;

          for (let device of devices) {
            if (device.DevAuth === true) {
              authenticated += 1;
            }
            let certExpiryDate = moment(device.Cert.ExpiryDate).format("DD/MM/YYYY");
            if (certExpiryDate >= moment(new Date()).subtract(30,'d').format("DD/MM/YYYY")) {
              expiring += 1;
            }
          }

          resolve({connected, authenticated, expiring});
        });
    });
  }

}
