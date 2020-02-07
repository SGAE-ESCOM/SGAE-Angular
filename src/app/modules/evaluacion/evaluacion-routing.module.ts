import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainEvaluacionComponent } from './main-evaluacion/main-evaluacion.component';

const routes: Routes = [
  { path: '', component: MainEvaluacionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluacionRoutingModule { }
