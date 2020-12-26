import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainAprobacionComponent } from './main-aprobacion/main-aprobacion.component';

const routes: Routes = [{ path: '', component: MainAprobacionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AprobacionRoutingModule { }
