import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainEtapasComponent } from './main-etapas/main-etapas.component';

const routes: Routes = [
  { path: '', component: MainEtapasComponent },
  { path: 'definir-etapas', loadChildren: () => import('./components/definir-etapas/definir-etapas.module').then(m => m.DefinirEtapasModule) },
  { path: 'definir-fechas', loadChildren: () => import('./components/definir-fechas/definir-fechas.module').then(m => m.DefinirFechasModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtapasRoutingModule { }
