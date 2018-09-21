import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class TableConfig {

  private _settings = {
    hideSubHeader: true,
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false,
    },
    pager: {
      display: true,
      perPage: 10
    },
    columns: {
      Status: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: (cell: any, row: any) => {
          let status = row.Status;
          let color = 'text-success';
          switch(status) {
            case 1: color = 'text-success'; break;
            case 2: color = 'text-warning'; break;
            case 3: color = 'text-danger'; break;
            default: color = 'text-default'; break;
          }
          return `
            <div class="table-status-icon-wrapper">
              <i class="fa fa-info-circle ${color} table-status-icon"></i>
            </div>
          `;
        }
      },
      DevID: {
        title: 'Name/Device ID',
        type: 'string'
      },
      CertID: {
        title: 'Certificate ID',
        type: 'string',
        valuePrepareFunction: (cell: any, row: any) => row.Cert.CertID
      },
      IssueDate: {
        title: 'Issue Date',
        type: 'string',
        valuePrepareFunction: (cell: any, row: any) => {
          // moment(row.Cert.IssueDate).fromNow()
          // return row.Cert.IssueDate;
          return moment(row.Cert.IssueDate).format('DD/MM/YYYY');
        }
      },
      ExpiryDate: {
        title: 'Expiry Date',
        type: 'string',
        valuePrepareFunction: (cell: any, row: any) => {
          // moment(row.Cert.ExpiryDate).fromNow()
          // return row.Cert.ExpiryDate;
          return moment(row.Cert.ExpiryDate).format('DD/MM/YYYY');
        }
      },
      LastSeen: {
        title: 'Last Seen',
        type: 'string',
        valuePrepareFunction: (cell: any, row: any) =>
          moment(row.LastSeen).fromNow()
      },
    }
  };

  public getCommonSettings() {
    return this._settings;
  }

  public shouldShowLabel1(pageName): boolean {
    switch(pageName) {
      case 'authorized':
        return true;
      case 'unauthorized':
        return false;
      case 'blocked':
        return true;
      default:
        return false;
    }
  }

  public shouldShowLabel2(pageName): boolean {
    switch(pageName) {
      case 'authorized':
        return true;
      case 'unauthorized':
        return false;
      case 'blocked':
        return false;
      default:
        return false;
    }
  }

  public getBtn1Label(pageName): string {
    switch(pageName) {
      case 'authorized':
        return 'Block';
      case 'unauthorized':
        return '';
      case 'blocked':
        return 'Unblock';
      default:
        return '';
    }
  }

  public getBtn2Label(pageName): string {
    switch(pageName) {
      case 'authorized':
        return 'Update';
      case 'unauthorized':
        return '';
      case 'blocked':
        return '';
      default:
        return '';
    }
  }

}
