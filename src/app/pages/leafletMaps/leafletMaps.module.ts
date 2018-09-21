import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { LeafletMaps } from './leafletMaps.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule
  ],
  declarations: [
    LeafletMaps
  ],
  providers: [
    
  ]
})
export class LeafletMapsModule {}
