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
import { RevisarCuentaComponent, ModalNuevoCampo } from './revisar-cuenta/revisar-cuenta.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormNuevoCampoComponent } from './revisar-cuenta/form-nuevo-campo/form-nuevo-campo.component';
import { ValidarPagoAspiranteComponent } from './validar-pago-aspirante/validar-pago-aspirante.component';
import { PipesModule } from '@shared/pipes/pipes.module';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import {  MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [GestionarCuentasComponent, ValidarPagosComponent, ConfigurarReferenciasComponent, ModalNuevaCuenta, FormNuevaCuentaComponent, RevisarCuentaComponent, ModalNuevoCampo, FormNuevoCampoComponent, ValidarPagoAspiranteComponent],
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
    MatSlideToggleModule,
    PipesModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-MX' }]
})
export class PagosAdminModule { }
