import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionarCuentasComponent } from './gestionar-cuentas/gestionar-cuentas.component';
import { ConfigurarReferenciasComponent } from './configurar-referencias/configurar-referencias.component';
import { ValidarPagosComponent } from './validar-pagos/validar-pagos.component';

const routes: Routes = [
  { path: 'gestionar-cuentas', component:  GestionarCuentasComponent },
  { path: 'configurar-referencias', component: ConfigurarReferenciasComponent },
  { path: 'validar-pagos', component: ValidarPagosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagosAdminRoutingModule { }
