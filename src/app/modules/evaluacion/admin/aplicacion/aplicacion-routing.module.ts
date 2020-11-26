import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainAplicacionComponent } from './main-aplicacion/main-aplicacion.component';

const routes: Routes = [{ path: '', component: MainAplicacionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AplicacionRoutingModule { }
