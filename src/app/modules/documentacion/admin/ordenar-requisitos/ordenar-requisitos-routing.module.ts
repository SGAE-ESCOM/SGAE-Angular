import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdenarRequisitosComponent } from './ordenar-requisitos.component';

const routes: Routes = [ {path: '', component: OrdenarRequisitosComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdenarRequisitosRoutingModule { }
