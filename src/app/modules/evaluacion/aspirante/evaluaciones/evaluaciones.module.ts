import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluacionesRoutingModule } from './evaluaciones-routing.module';
import { MainEvaluacionesComponent } from './main-evaluaciones/main-evaluaciones.component';
import { AngularMaterialModule } from '@modules/template/angular-material.module';


@NgModule({
  declarations: [MainEvaluacionesComponent],
  imports: [
    CommonModule,
    EvaluacionesRoutingModule,
    AngularMaterialModule
  ]
})
export class EvaluacionesModule { }
