import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./admin/grupos-admin-routing.module').then( m => m.GruposAdminRoutingModule) },
  { path: '', loadChildren: () => import('./aspirante/grupos-aspirante-routing.module').then( m => m.GruposAspiranteRoutingModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GruposRoutingModule { }
