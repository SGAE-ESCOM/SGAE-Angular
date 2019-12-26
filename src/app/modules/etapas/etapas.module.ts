import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtapasRoutingModule } from './etapas-routing.module';
import { MainEtapasComponent } from './main-etapas/main-etapas.component';


@NgModule({
  declarations: [MainEtapasComponent],
  imports: [
    CommonModule,
    EtapasRoutingModule
  ]
})
export class EtapasModule { }
