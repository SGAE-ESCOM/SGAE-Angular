import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidarDocumentacionComponent } from './validar-documentacion/validar-documentacion.component';
import { AdministrarDocumentacionComponent } from './administrar-documentacion/administrar-documentacion.component';
import { ValidarAspiranteComponent } from './validar-aspirante/validar-aspirante.component';

const routes: Routes = [
  { path: 'validar', component: ValidarDocumentacionComponent },
  { path: 'validar/:id', component: ValidarAspiranteComponent },
  { path: 'administrar', component: AdministrarDocumentacionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentacionAdminRoutingModule { }
