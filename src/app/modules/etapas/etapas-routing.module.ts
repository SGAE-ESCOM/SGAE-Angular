import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainEtapasComponent } from './main-etapas/main-etapas.component';

const routes: Routes = [
  { path: '', component: MainEtapasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtapasRoutingModule { }
