import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InscribirGrupoComponent } from './inscribir-grupo/inscribir-grupo.component';

const routes: Routes = [
  { path: 'inscribir-grupo', component: InscribirGrupoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GruposAspiranteRoutingModule { }
