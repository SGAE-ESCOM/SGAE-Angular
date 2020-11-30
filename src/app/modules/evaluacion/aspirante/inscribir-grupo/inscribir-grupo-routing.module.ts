import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainInscribirGrupoComponent } from './main-inscribir-grupo/main-inscribir-grupo.component';

const routes: Routes = [{ path: '', component: MainInscribirGrupoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscribirGrupoRoutingModule { }
