import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagosAdminRoutingModule } from './pagos-admin-routing.module';
import { GestionarCuentasComponent, ModalNuevaCuenta } from './gestionar-cuentas/gestionar-cuentas.component';
import { ValidarPagosComponent } from './validar-pagos/validar-pagos.component';
import { ConfigurarReferenciasComponent } from './configurar-referencias/configurar-referencias.component';
import { FormCuentasPagosModule } from './form-cuentas/form-cuentas-pagos.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AngularMaterialModule } from '@modules/template/angular-material.module';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { FormNuevaCuentaComponent } from './gestionar-cuentas/form-nueva-cuenta/form-nueva-cuenta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RevisarCuentaComponent } from './revisar-cuenta/revisar-cuenta.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  declarations: [GestionarCuentasComponent, ValidarPagosComponent, ConfigurarReferenciasComponent, ModalNuevaCuenta, FormNuevaCuentaComponent, RevisarCuentaComponent],
  imports: [
    CommonModule,
    PagosAdminRoutingModule,
    FormCuentasPagosModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    AngularMaterialModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    FormsModule, 
    ReactiveFormsModule,
    MatSlideToggleModule
  ]
})
export class PagosAdminModule { }
