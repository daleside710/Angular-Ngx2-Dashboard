import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import 'leaflet-map';

import { Gateway } from '../../interfaces/gateway';
import { GatewaysService } from '../../services/gateways.service';

@Component({
  selector: 'monitoring',
  styleUrls: ['./monitoring.scss'],
  templateUrl: './monitoring.html'
})
export class Monitoring implements OnInit, AfterViewInit, OnDestroy {

  public gatewayList: Gateway[];
  private _map: any;

  /**
   * class constructor
   * @param (private) _service: GatewaysService
   */
  constructor(private _service: GatewaysService,
              private _elementRef:ElementRef) {

  }

  /**
   * Angular lifecycle hook
   * Angular class initializer i.e. constructor
   */
  ngOnInit() {
    L.Icon.Default.imagePath = 'assets/img/theme/vendor/leaflet';

    this._service.getGatewaysList()
      .then( (gateways: Gateway[]) => {
        this.gatewayList = gateways;
        for (let g of this.gatewayList) {
          L.marker([g['Latitude'], g['Longitude']]).addTo(this._map);
        }
      });
  }

  /**
   * Angular lifecycle hook
   * Angular class initializer i.e. constructor
   * Only after the view has been initialized
   */
  ngAfterViewInit() {
    let el = this._elementRef.nativeElement.querySelector('.leaflet-maps');
    this._map = L.map(el).setView([1.373259, 103.811675], 11);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this._map);
  }


  /**
   * Angular lifecycle hook
   * Angular class destructor
   */
  ngOnDestroy() {}

}
