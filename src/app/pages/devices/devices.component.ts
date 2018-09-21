import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Modal } from './modal/modal.component';
import { FlatButtons } from './flatButtons/flatButtons.component';
import { TableConfig } from './tableConfig';

import { Device } from '../../interfaces/device';
import { DevicesService } from '../../services/devices.service';

@Component({
  selector: 'devices',
  styleUrls: ['./devices.scss'],
  templateUrl: './devices.html'
})
export class Devices implements OnInit, OnDestroy {

  source: LocalDataSource = new LocalDataSource();
  settings = this._tableConfig.getCommonSettings();

  private _pageName: string;
  private _routeSubscription: any;
  private _devicesRefresher: number;
  private _devices: Device[];

  constructor(private _tableConfig: TableConfig,
              private _route: ActivatedRoute,
              private _service: DevicesService,
              private _modalService: NgbModal) {
  }

  ngOnInit() {
    this._routeSubscription = this._route.params.subscribe( params => {
      this._pageName = params['status'];
      this._devices = [];
      this._initializeTable();
      this._getDevicesList();
      this._devicesRefresher = setInterval(() => {
        this._getDevicesList();
      }, 15000);
    });
  }

  ngOnDestroy() {
    this._routeSubscription.unsubscribe();
    if (this._devicesRefresher) {
      clearInterval(this._devicesRefresher);
    }
  }

  private _getDevicesList() {
    switch(this._pageName) {
      case 'authorized':
        this._service.getAuthenticatedDeivcesList()
          .then( (devices: Device[]) => this._resolveFetchedData(devices) );
        break;
      case 'unauthorized':
        this._service.getUnauthenticatedDeivcesList()
          .then( (devices: Device[]) => this._resolveFetchedData(devices) );
        break;
      case 'blocked':
        this._service.getBlockedDeivcesList()
          .then( (devices: Device[]) => this._resolveFetchedData(devices) );
        break;
      default:
        this._service.getDeivcesList()
          .then( (devices: Device[]) => this._resolveFetchedData(devices) );
        break;
    }
  }

  private _resolveFetchedData(devices: Device[]) {
    this._devices = devices;
    this.source.load(this._devices);
  }

  private _initializeTable() {
    var _this = this;
    this.settings.columns['actions'] = {
      title: 'Actions',
      type: 'custom',
      renderComponent: FlatButtons,
      onComponentInitFunction(instance) {
        instance.showLabel1 = _this._tableConfig.shouldShowLabel1(_this._pageName);
        instance.showLabel2 = _this._tableConfig.shouldShowLabel2(_this._pageName);
        instance.label1 = _this._tableConfig.getBtn1Label(_this._pageName);
        instance.label2 = _this._tableConfig.getBtn2Label(_this._pageName);
        instance.btn1Emitter.subscribe( row => _this._onBtn1Click(row) );
        instance.btn2Emitter.subscribe( row => _this._onBtn2Click(row) );
      }
    };
  }

  private _onBtn1Click(row: any) {
    let option = this._tableConfig.getBtn1Label(this._pageName).toLowerCase();
    this._showConfirmModal(row, option);
  }

  private _onBtn2Click(row: any) {
    let option = this._tableConfig.getBtn2Label(this._pageName).toLowerCase();
    this._showConfirmModal(row, option);
  }

  private _showConfirmModal(row: any, option: string): void {
    const activeModal = this._modalService.open(Modal, {size: 'sm'});
    activeModal.componentInstance.modalHeader = 'Confirm Action';
    activeModal.componentInstance.modalContent = `Are you sure you want to ${option} device with ID: ${row.DevID} ?`;
    activeModal.componentInstance.showPrimaryBtn = true;
    activeModal.componentInstance.primaryBtnTitle = `Yes, ${option}`;
    activeModal.componentInstance.showSecondaryBtn = true;
    activeModal.componentInstance.secondaryBtnTitle = `No`;
    activeModal.result.then(
      (result: string) => {
        console.log(result);
        this._service.manageDeviceById(row.DevID, option)
          .then( (device: Device) => {
            console.log(device);
          })
      },
      (reason: string) => {
        console.log(reason);
      }
    )
  }
}
