import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidarDocumentacionComponent } from './validar-documentacion/validar-documentacion.component';
import { AdministrarDocumentacionComponent } from './administrar-documentacion/administrar-documentacion.component';

const routes: Routes = [
  { path: 'validar', component: ValidarDocumentacionComponent },
  { path: 'administrar', component: AdministrarDocumentacionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentacionAdminRoutingModule { }
