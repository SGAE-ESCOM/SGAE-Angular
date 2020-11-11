import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPagosComponent } from './main-pagos/main-pagos.component';
import { PagosAdminModule } from './admin/pagos-admin.module'
import { PagosAspiranteModule } from './aspirante/pagos-aspirante.module'

const routes: Routes = [
  { path: '', component: MainPagosComponent },
  { path: '', loadChildren: () => import('./admin/pagos-admin.module').then(m => m.PagosAdminModule) },
  { path: '', loadChildren: () => import('./aspirante/pagos-aspirante.module').then(m => m.PagosAspiranteModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagosRoutingModule { }
