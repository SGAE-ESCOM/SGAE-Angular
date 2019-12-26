import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainConvocatoriaComponent } from './main-convocatoria/main-convocatoria.component';

const routes: Routes = [
  { path: '', component: MainConvocatoriaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConvocatoriaRoutingModule { }
