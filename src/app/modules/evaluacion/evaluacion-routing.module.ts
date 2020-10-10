import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainEvaluacionComponent } from './main-evaluacion/main-evaluacion.component';

const routes: Routes = [
  { path: '', component: MainEvaluacionComponent },
  { path: '', loadChildren: () => import('./admin/evaluacion-admin.module').then(m => m.EvaluacionAdminModule) },
  { path: '', loadChildren: () => import('./aspirante/evaluacion-aspirante.module').then(m => m.EvaluacionAspiranteModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluacionRoutingModule { }
