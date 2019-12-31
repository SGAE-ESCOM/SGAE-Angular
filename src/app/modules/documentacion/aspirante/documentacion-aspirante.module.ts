import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentacionAspiranteRoutingModule } from './documentacion-aspirante-routing.module';
import { SubirDocumentacionComponent } from './subir-documentacion/subir-documentacion.component';


@NgModule({
  declarations: [SubirDocumentacionComponent],
  imports: [
    CommonModule,
    DocumentacionAspiranteRoutingModule
  ]
})
export class DocumentacionAspiranteModule { }
