import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainEvaluacionesComponent } from './main-evaluaciones/main-evaluaciones.component';

const routes: Routes = [ {path: '', component: MainEvaluacionesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluacionesRoutingModule { }
