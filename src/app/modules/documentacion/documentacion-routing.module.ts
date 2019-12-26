import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainDocumentacionComponent } from './main-documentacion/main-documentacion.component';

const routes: Routes = [ 
  { path: '', component: MainDocumentacionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentacionRoutingModule { }
