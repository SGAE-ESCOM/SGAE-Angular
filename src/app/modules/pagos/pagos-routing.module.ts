import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPagosComponent } from './main-pagos/main-pagos.component';

const routes: Routes = [
  { path: '', component: MainPagosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagosRoutingModule { }
