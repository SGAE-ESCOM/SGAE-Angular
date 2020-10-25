import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionarEvaluacionRoutingModule } from './gestionar-evaluacion-routing.module';
import { MainGestionarEvaluacionComponent } from './main-gestionar-evaluacion/main-gestionar-evaluacion.component';
import { CardsModule } from '@shared/components/cards/cards.module';
import { AdminEvaluacionComponent } from './admin-evaluacion/admin-evaluacion.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { TablasModule } from '@shared/components/tablas/tablas.module';
import { AngularMaterialModule } from '@modules/template/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MainGestionarEvaluacionComponent, AdminEvaluacionComponent, PreguntasComponent],
  imports: [
    CommonModule,
    GestionarEvaluacionRoutingModule,
    FormsModule, ReactiveFormsModule,
    CardsModule,
    TablasModule,
    AngularMaterialModule
  ]
})
export class GestionarEvaluacionModule { }
