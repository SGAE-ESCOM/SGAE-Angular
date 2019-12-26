import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConvocatoriaRoutingModule } from './convocatoria-routing.module';
import { MainConvocatoriaComponent } from './main-convocatoria/main-convocatoria.component';


@NgModule({
  declarations: [MainConvocatoriaComponent],
  imports: [
    CommonModule,
    ConvocatoriaRoutingModule
  ]
})
export class ConvocatoriaModule { }
