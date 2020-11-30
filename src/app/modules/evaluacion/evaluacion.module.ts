import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluacionRoutingModule } from './evaluacion-routing.module';
import { MainEvaluacionComponent } from './main-evaluacion/main-evaluacion.component';
import { CardsModule } from '@shared/components/cards/cards.module';

@NgModule({
  declarations: [MainEvaluacionComponent],
  imports: [
    CommonModule,
    EvaluacionRoutingModule,
    CardsModule
  ]
})
export class EvaluacionModule { }
