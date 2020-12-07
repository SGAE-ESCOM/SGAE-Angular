import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainEvaluacionesComponent } from './main-evaluaciones/main-evaluaciones.component';
import { MainSimuladorComponent } from './main-simulador/main-simulador.component';

const routes: Routes = [
  { path: '', component: MainEvaluacionesComponent },
  { path: 'simulador', component: MainSimuladorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluacionesRoutingModule { }
