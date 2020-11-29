import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagosAspiranteRoutingModule } from './pagos-aspirante-routing.module';
import { FormatoPagoComponent } from './formato-pago/formato-pago.component';
import { EvidenciaPagoComponent } from './evidencia-pago/evidencia-pago.component';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [FormatoPagoComponent, EvidenciaPagoComponent],
  imports: [
    CommonModule,
    PagosAspiranteRoutingModule,
    MatSelectModule
  ]
})
export class PagosAspiranteModule { }
