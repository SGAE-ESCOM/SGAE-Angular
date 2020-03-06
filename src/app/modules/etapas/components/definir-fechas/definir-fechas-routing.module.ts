import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefinirFechasComponent } from './definir-fechas.component';


const routes: Routes = [{ path: '', component: DefinirFechasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefinirFechasRoutingModule { }
