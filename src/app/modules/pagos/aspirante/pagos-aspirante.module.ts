import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagosAspiranteRoutingModule } from './pagos-aspirante-routing.module';
import { FormatoPagoComponent } from './formato-pago/formato-pago.component';
import { EvidenciaPagoComponent } from './evidencia-pago/evidencia-pago.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AngularMaterialModule } from '@modules/template/angular-material.module';
import { DndDirective } from './evidencia-pago/dnd.directive';
import { ProgressComponent } from './evidencia-pago/progress/progress.component';


@NgModule({
  declarations: [FormatoPagoComponent, EvidenciaPagoComponent, DndDirective, ProgressComponent],
  imports: [
    CommonModule,
    PagosAspiranteRoutingModule,
    MatSelectModule,
    MatButtonModule,
    AngularMaterialModule
  ]
})
export class PagosAspiranteModule { }
