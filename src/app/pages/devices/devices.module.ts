import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MomentModule, TimeAgoPipe } from 'ngx-moment';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';

import { Devices } from './devices.component';
import { FlatButtons } from './flatButtons/flatButtons.component';
import { Modal } from './modal/modal.component';
import { TableConfig } from './tableConfig';
import { routing } from './devices.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    NgbModalModule,
    routing,

    Ng2SmartTableModule,
    MomentModule
  ],
  declarations: [
    Devices,
    Modal,
    FlatButtons
  ],
  providers: [
    TableConfig,
    TimeAgoPipe
  ],
  entryComponents: [
    FlatButtons,
    Modal
  ]
})
export class DevicesModule {}
