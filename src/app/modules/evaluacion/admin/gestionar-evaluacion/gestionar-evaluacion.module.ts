import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionarEvaluacionRoutingModule } from './gestionar-evaluacion-routing.module';
import { MainGestionarEvaluacionComponent } from './main-gestionar-evaluacion/main-gestionar-evaluacion.component';
import { CardsModule } from '@shared/components/cards/cards.module';
import { TablasModule } from '@shared/components/tablas/tablas.module';
import { AngularMaterialModule } from '@modules/template/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaModule } from '@shared/components/lista/lista.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormTemasComponent } from './preguntas/form-temas/form-temas.component';
import { MainPreguntasComponent, ModalTemas } from './preguntas/main-preguntas/main-preguntas.component';
import { FormSimuladorModule } from '@modules/evaluacion/form-simulador/form-simulador.module';
import { FormPreguntasComponent } from './preguntas/form-preguntas/form-preguntas.component';
import { CrearSimuladorComponent, ModalPregunta } from './preguntas/crear-simulador/crear-simulador.component';
import { KatexModule } from 'ng-katex';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { ListaOpcionesComponent } from './preguntas/lista-opciones/lista-opciones.component';
import { MainAdminEvaluacionComponent } from './admin-evaluacion/main-admin-evaluacion/main-admin-evaluacion.component';
import { FormAdminEvaluacionComponent } from './admin-evaluacion/form-admin-evaluacion/form-admin-evaluacion.component';

@NgModule({
  declarations: [MainGestionarEvaluacionComponent, ModalTemas, CrearSimuladorComponent, ModalPregunta, FormTemasComponent, MainPreguntasComponent, FormPreguntasComponent, ListaOpcionesComponent, MainAdminEvaluacionComponent, FormAdminEvaluacionComponent],
  imports: [
    CommonModule,
    GestionarEvaluacionRoutingModule,
    FormsModule, ReactiveFormsModule,
    CardsModule,
    TablasModule,
    AngularMaterialModule,
    ListaModule,
    MatDialogModule,
    FormSimuladorModule,
    MaterialFileInputModule,
    KatexModule
  ]
})
export class GestionarEvaluacionModule { }