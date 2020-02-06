import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubirDocumentacionComponent } from './subir-documentacion/subir-documentacion.component';

const routes: Routes = [{path:'subir', component: SubirDocumentacionComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentacionAspiranteRoutingModule { }
