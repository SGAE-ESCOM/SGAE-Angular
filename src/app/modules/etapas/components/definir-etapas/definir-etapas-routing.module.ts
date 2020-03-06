import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefinirEtapasComponent } from './definir-etapas.component';

const routes: Routes = [{ path: '', component: DefinirEtapasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefinirEtapasRoutingModule { }
