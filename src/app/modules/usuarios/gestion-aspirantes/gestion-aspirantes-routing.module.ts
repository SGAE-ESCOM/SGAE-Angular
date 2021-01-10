import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainGestionAspirantesComponent } from './main-gestion-aspirantes/main-gestion-aspirantes.component';
import { RevisarAspirantesComponent } from './revisar-aspirantes/revisar-aspirantes.component';
import { AsignarAspirantesComponent } from './asignar-aspirantes/asignar-aspirantes.component';

const routes: Routes = [
  { path: '', component: MainGestionAspirantesComponent },
  { path: 'revisar-aspirantes', component: RevisarAspirantesComponent },
  { path: 'asignar-aspirantes', component:  AsignarAspirantesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionAspirantesRoutingModule {}
