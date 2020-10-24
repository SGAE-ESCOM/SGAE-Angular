import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionarEvaluacionRoutingModule } from './gestionar-evaluacion-routing.module';
import { MainGestionarEvaluacionComponent } from './main-gestionar-evaluacion/main-gestionar-evaluacion.component';
import { CardsModule } from '@shared/components/cards/cards.module';
import { AdminEvaluacionComponent } from './admin-evaluacion/admin-evaluacion.component';
import { PreguntasComponent } from './preguntas/preguntas.component';


@NgModule({
  declarations: [MainGestionarEvaluacionComponent, AdminEvaluacionComponent, PreguntasComponent],
  imports: [
    CommonModule,
    GestionarEvaluacionRoutingModule,
    CardsModule
  ]
})
export class GestionarEvaluacionModule { }
