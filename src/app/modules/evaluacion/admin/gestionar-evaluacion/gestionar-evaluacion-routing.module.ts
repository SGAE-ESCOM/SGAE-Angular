import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminEvaluacionComponent } from './admin-evaluacion/admin-evaluacion.component';
import { MainGestionarEvaluacionComponent } from './main-gestionar-evaluacion/main-gestionar-evaluacion.component';
import { PreguntasComponent } from './preguntas/preguntas.component';

const routes: Routes = [
  { path: '', component: MainGestionarEvaluacionComponent },
  { path: 'preguntas', component: PreguntasComponent },
  { path: 'evaluacion', component: AdminEvaluacionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionarEvaluacionRoutingModule { }
