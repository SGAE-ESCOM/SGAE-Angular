import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'grupos', loadChildren: () => import('./inscribir-grupo/inscribir-grupo.module').then(m => m.InscribirGrupoModule) },
  { path: 'evaluaciones', loadChildren: () => import('./evaluaciones/evaluaciones.module').then(m => m.EvaluacionesModule) },
  { path: 'resultados', loadChildren: () => import('./resultados/resultados.module').then(m => m.ResultadosModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluacionAspiranteRoutingModule { }
