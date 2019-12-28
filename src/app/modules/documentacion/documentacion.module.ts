import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentacionRoutingModule } from './documentacion-routing.module';
import { MainDocumentacionComponent } from './main-documentacion/main-documentacion.component';
import { AngularMaterialModule } from "@template/angular-material.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MainDocumentacionComponent],
  imports: [
    CommonModule,
    DocumentacionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class DocumentacionModule { }
