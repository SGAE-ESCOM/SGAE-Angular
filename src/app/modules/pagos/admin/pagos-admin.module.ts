import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagosAdminRoutingModule } from './pagos-admin-routing.module';
import { GestionarCuentasComponent } from './gestionar-cuentas/gestionar-cuentas.component';
import { ValidarPagosComponent } from './validar-pagos/validar-pagos.component';
import { ConfigurarReferenciasComponent } from './configurar-referencias/configurar-referencias.component';
import { FormCuentasPagosModule } from './form-cuentas/form-cuentas-pagos.module';


@NgModule({
  declarations: [GestionarCuentasComponent, ValidarPagosComponent, ConfigurarReferenciasComponent],
  imports: [
    CommonModule,
    PagosAdminRoutingModule,
    FormCuentasPagosModule
  ]
})
export class PagosAdminModule { }
