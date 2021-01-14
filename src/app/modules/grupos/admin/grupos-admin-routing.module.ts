import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GruposComponent } from './grupos/grupos.component';

const routes: Routes = [
  { path: 'gestionar-grupos', component: GruposComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GruposAdminRoutingModule { }
