import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluacionesRoutingModule } from './evaluaciones-routing.module';
import { MainEvaluacionesComponent } from './main-evaluaciones/main-evaluaciones.component';
import { AngularMaterialModule } from '@modules/template/angular-material.module';
import { MainSimuladorComponent } from './main-simulador/main-simulador.component';
import { FormSimuladorModule } from '@modules/evaluacion/form-simulador/form-simulador.module';

@NgModule({
  declarations: [MainEvaluacionesComponent, MainSimuladorComponent],
  imports: [
    CommonModule,
    EvaluacionesRoutingModule,
    AngularMaterialModule,
    FormSimuladorModule
  ]
})
export class EvaluacionesModule { }
