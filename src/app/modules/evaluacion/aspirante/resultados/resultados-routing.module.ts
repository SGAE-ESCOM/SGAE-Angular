import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainResultadosComponent } from './main-resultados/main-resultados.component';

const routes: Routes = [{ path: '', component: MainResultadosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultadosRoutingModule { }
