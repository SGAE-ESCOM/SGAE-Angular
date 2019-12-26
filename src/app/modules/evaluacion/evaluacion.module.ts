import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluacionRoutingModule } from './evaluacion-routing.module';
import { MainEvaluacionComponent } from './main-evaluacion/main-evaluacion.component';


@NgModule({
  declarations: [MainEvaluacionComponent],
  imports: [
    CommonModule,
    EvaluacionRoutingModule
  ]
})
export class EvaluacionModule { }
