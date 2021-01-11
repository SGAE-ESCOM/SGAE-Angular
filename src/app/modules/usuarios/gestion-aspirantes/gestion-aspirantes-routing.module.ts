import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainGestionAspirantesComponent } from './main-gestion-aspirantes/main-gestion-aspirantes.component';
import { RevisarAspirantesComponent } from './revisar-aspirantes/revisar-aspirantes.component';
import { AsignarAspirantesComponent } from './asignar-aspirantes/asignar-aspirantes.component';
import { VerAspiranteComponent } from './ver-aspirante/ver-aspirante.component';
import { IndicacionesAsignacionComponent } from './indicaciones-asignacion/indicaciones-asignacion.component';

const routes: Routes = [
  { path: '', component: MainGestionAspirantesComponent },
  { path: 'revisar-aspirantes', component: RevisarAspirantesComponent },
  { path: 'revisar-aspirantes/ver-aspirante', component:  VerAspiranteComponent},
  { path: 'asignar-aspirantes', component:  AsignarAspirantesComponent},
  { path: 'editar-indicaciones', component:  IndicacionesAsignacionComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionAspirantesRoutingModule {}
