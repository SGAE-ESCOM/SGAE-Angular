import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionAspirantesComponent } from './gestion-aspirantes.component';


const routes: Routes = [
  { path: '', component: GestionAspirantesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionAspirantesRoutingModule { }
