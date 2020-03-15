import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentacionRoutingModule } from './documentacion-routing.module';
import { CardsModule } from '@shared/cards/cards.module';
import { MainDocumentacionComponent } from './main-documentacion/main-documentacion.component';

@NgModule({
  declarations: [MainDocumentacionComponent],
  imports: [
    CommonModule,
    DocumentacionRoutingModule,
    CardsModule
  ],
})
export class DocumentacionModule { }
