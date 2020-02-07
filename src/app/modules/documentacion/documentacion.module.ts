import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentacionRoutingModule } from './documentacion-routing.module';
import { MainDocumentacionComponent } from './main-documentacion/main-documentacion.component';
import { AngularMaterialModule } from "@template/angular-material.module";
import { CardsModule } from '@shared/cards/cards.module';

@NgModule({
  declarations: [MainDocumentacionComponent],
  imports: [
    CommonModule,
    DocumentacionRoutingModule,
    AngularMaterialModule,
    CardsModule
  ],
})
export class DocumentacionModule { }
