import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';

@Injectable()
export class APIService {
  private _URL: string = environment.apiUrl;
  private _devices: string = 'devices';
  private _devices_authenticated: string = 'auth=True';
  private _devices_unauthenticated: string = 'auth=False';
  private _devices_blocked: string = 'block=True';
  // private _devices_connected: string = 'connection=True';
  // private _devices_blocked_and_disconnected: string = 'connection=False&blocked=True';
  // private _devices_malicious: string = 'status=malicious';
  private _manage_device: string = 'manage';
  // private _cert_for_device: string = 'certs';
  // private _details_for_device: string = 'details';
  private _gateways: string = 'gateways';

  /**
   * Get devices list url
   * @return string
   */
  public getDevicesList(): string {
    return [this._URL, this._devices].join('/');
  }

  /**
   * Get device by id url
   * @param id:string
   * @return string
   */
  public getDeviceBy(id: string): string {
    return [this.getDevicesList(), id].join('/');
  }

  /**
   * Get manage device by id url
   * @param id:string
   * @return string
   */
  public getManageDeviceBy(id: string): string {
    return [this.getDeviceBy(id), this._manage_device].join('/');
  }

  /**
   * Get certs for device by id url
   * @param id:string
   * @return string
   */
  // public getCertsForDeviceBy(id: string): string {
  //   return [this.getDeviceBy(id), this._cert_for_device].join('/');
  // }

  /**
   * Get details for device by id url
   * @param id:string
   * @return string
   */
  // public getDetailsForDeviceBy(id: string): string {
  //   return [this.getDeviceBy(id), this._details_for_device].join('/');
  // }

  /**
   * Get authenticated devices list url
   * @return string
   */
  public getAuthenticatedDevicesList(): string {
    return [this.getDevicesList(), this._devices_authenticated].join('?');
  }

  /**
   * Get unauthenticated devices list url
   * @return string
   */
  public getUnauthenticatedDevicesList(): string {
    return [this.getDevicesList(), this._devices_unauthenticated].join('?');
  }

  /**
   * Get blocked devices list url
   * @return string
   */
  public getBlockedDevicesList(): string {
    return [this.getDevicesList(), this._devices_blocked].join('?');
  }

  /**
   * Get connected devices list url
   * @return string
   */
  // public getConnectedDevicesList(): string {
  //   return [this.getDevicesList(), this._devices_connected].join('?');
  // }

  /**
   * Get blocked and disconnected devices list url
   * @return string
   */
  // public getBlockedAndDisconnectedDevicesList(): string {
  //   return [this.getDevicesList(), this._devices_blocked_and_disconnected].join('?');
  // }

  /**
   * Get malicious devices list url
   * @return string
   */
  // public getMaliciousDevicesList(): string {
  //   return [this.getDevicesList(), this._devices_malicious].join('?');
  // }

  /**
   * Get gateways list url
   * @return string
   */
  public getGatewaysList(): string {
    return [this._URL, this._gateways].join('/');
  }

  /**
   * Get gateway by id url
   * @param id:string
   * @return string
   */
  public getGatewayBy(id: string): string {
    return [this.getGatewaysList(), id].join('/');
  }

  /**
   * API Generic error handler
   * in production disable console.log
   * @param error:any
   * @return Promise containing type any
   */
  public handleApiError(error: any): Promise<any> {
    console.error('API Error', error);
    return Promise.reject(error.message || error);
  }


}
