import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionarEvaluacionRoutingModule } from './gestionar-evaluacion-routing.module';
import { MainGestionarEvaluacionComponent } from './main-gestionar-evaluacion/main-gestionar-evaluacion.component';
import { CardsModule } from '@shared/components/cards/cards.module';
import { AdminEvaluacionComponent } from './admin-evaluacion/admin-evaluacion.component';
import { TablasModule } from '@shared/components/tablas/tablas.module';
import { AngularMaterialModule } from '@modules/template/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaModule } from '@shared/components/lista/lista.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormTemasComponent } from './preguntas/form-temas/form-temas.component';
import { MainPreguntasComponent, ModalTemas } from './preguntas/main-preguntas/main-preguntas.component';

@NgModule({
  declarations: [MainGestionarEvaluacionComponent, AdminEvaluacionComponent, ModalTemas, FormTemasComponent, MainPreguntasComponent],
  imports: [
    CommonModule,
    GestionarEvaluacionRoutingModule,
    FormsModule, ReactiveFormsModule,
    CardsModule,
    TablasModule,
    AngularMaterialModule,
    ListaModule,
    MatDialogModule
  ]
})
export class GestionarEvaluacionModule { }
