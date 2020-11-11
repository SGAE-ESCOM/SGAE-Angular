import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagosAspiranteRoutingModule } from './pagos-aspirante-routing.module';
import { FormatoPagoComponent } from './formato-pago/formato-pago.component';
import { EvidenciaPagoComponent } from './evidencia-pago/evidencia-pago.component';


@NgModule({
  declarations: [FormatoPagoComponent, EvidenciaPagoComponent],
  imports: [
    CommonModule,
    PagosAspiranteRoutingModule
  ]
})
export class PagosAspiranteModule { }
