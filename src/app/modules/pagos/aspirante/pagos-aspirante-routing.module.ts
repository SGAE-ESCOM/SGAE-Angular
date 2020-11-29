import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EvidenciaPagoComponent } from './evidencia-pago/evidencia-pago.component';
import { FormatoPagoComponent } from './formato-pago/formato-pago.component';

const routes: Routes = [
  { path: 'formato-pago', component: FormatoPagoComponent },
  { path: 'evidenciar-pago', component: EvidenciaPagoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagosAspiranteRoutingModule { }
