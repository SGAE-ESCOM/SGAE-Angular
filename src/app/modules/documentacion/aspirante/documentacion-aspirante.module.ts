import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentacionAspiranteRoutingModule } from './documentacion-aspirante-routing.module';
import { SubirDocumentacionComponent } from './subir-documentacion/subir-documentacion.component';
import { FormularioModule } from '../formulario/formulario.module';

@NgModule({
  declarations: [SubirDocumentacionComponent],
  imports: [
    CommonModule,
    DocumentacionAspiranteRoutingModule,
    FormularioModule
  ]
})
export class DocumentacionAspiranteModule { }
