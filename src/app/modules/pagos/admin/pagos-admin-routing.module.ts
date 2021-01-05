import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionarCuentasComponent } from './gestionar-cuentas/gestionar-cuentas.component';
import { ConfigurarReferenciasComponent } from './configurar-referencias/configurar-referencias.component';
import { ValidarPagosComponent } from './validar-pagos/validar-pagos.component';
import { RevisarCuentaComponent } from './revisar-cuenta/revisar-cuenta.component';
import { ValidarPagoAspiranteComponent } from './validar-pago-aspirante/validar-pago-aspirante.component';

const routes: Routes = [
  { path: 'gestionar-cuentas', component:  GestionarCuentasComponent },
  //{ path: 'configurar-referencias', component: ConfigurarReferenciasComponent },
  { path: 'validar-pagos', component: ValidarPagosComponent },
  { path: 'gestionar-cuentas/revisar-cuenta/:id', component: RevisarCuentaComponent},
  { path: 'validar-pagos/aspirante', component: ValidarPagoAspiranteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagosAdminRoutingModule { }
