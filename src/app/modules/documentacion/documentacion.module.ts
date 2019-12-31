import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentacionRoutingModule } from './documentacion-routing.module';
import { MainDocumentacionComponent } from './main-documentacion/main-documentacion.component';
import { AngularMaterialModule } from "@template/angular-material.module";
import { TemplateModule } from '@modules/template/template.module';

@NgModule({
  declarations: [MainDocumentacionComponent],
  imports: [
    CommonModule,
    DocumentacionRoutingModule,
    AngularMaterialModule,
    TemplateModule
  ],
})
export class DocumentacionModule { }
