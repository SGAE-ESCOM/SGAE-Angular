import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentacionRoutingModule } from './documentacion-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainDocumentacionComponent } from './main-documentacion/main-documentacion.component';
import { AngularMaterialModule } from "@template/angular-material.module";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [MainDocumentacionComponent],
  imports: [
    CommonModule,
    DocumentacionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }]
})
export class DocumentacionModule { }
