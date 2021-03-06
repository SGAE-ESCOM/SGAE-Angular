import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AplicacionRoutingModule } from './aplicacion-routing.module';
import { MainAplicacionComponent, ModalAplicacion } from './main-aplicacion/main-aplicacion.component';
import { AngularMaterialModule } from '@modules/template/angular-material.module';
import { FormAplicacionComponent } from './form-aplicacion/form-aplicacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaEvaluacionesComponent } from './lista-evaluaciones/lista-evaluaciones.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { InputFechaModule } from '@shared/components/input-fecha/input-fecha.module';
import { InputHoraModule } from '@shared/components/input-hora/input-hora.module';
import { ListaGruposAplicacionComponent } from './lista-grupos-aplicacion/lista-grupos-aplicacion.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [MainAplicacionComponent, ModalAplicacion, FormAplicacionComponent, ListaEvaluacionesComponent, ListaGruposAplicacionComponent],
  imports: [
    CommonModule,
    AplicacionRoutingModule,
    FormsModule, ReactiveFormsModule,
    MatDialogModule,
    AngularMaterialModule,
    MatCheckboxModule,
    InputFechaModule,
    InputHoraModule
  ]
})
export class AplicacionModule { }
