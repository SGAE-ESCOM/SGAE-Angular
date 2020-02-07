import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainDocumentacionComponent } from './main-documentacion/main-documentacion.component';

const routes: Routes = [ 
  { path: '', component: MainDocumentacionComponent },
  { path: '', loadChildren: () => import('./aspirante/documentacion-aspirante.module').then( m => m.DocumentacionAspiranteModule ) },
  { path: '', loadChildren: () => import('./admin/documentacion-admin.module').then( m => m.DocumentacionAdminModule ) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentacionRoutingModule { }
