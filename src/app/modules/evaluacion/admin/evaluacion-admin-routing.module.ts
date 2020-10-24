import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GruposComponent } from './grupos/grupos.component';

const routes: Routes = [
  { path: 'gestionar-grupos', component: GruposComponent },
  { path: 'gestionar-evaluacion', loadChildren: () => import('./gestionar-evaluacion/gestionar-evaluacion.module').then( m => m.GestionarEvaluacionModule ) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluacionAdminRoutingModule { }
