import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentacionAdminRoutingModule } from './documentacion-admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from "@template/angular-material.module";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from "@angular/material";
import { MatSortModule } from "@angular/material";

import { AdministrarDocumentacionComponent } from './administrar-documentacion/administrar-documentacion.component';
import { ValidarDocumentacionComponent } from './validar-documentacion/validar-documentacion.component';

@NgModule({
  declarations: [AdministrarDocumentacionComponent, ValidarDocumentacionComponent],
  imports: [
    CommonModule,
    DocumentacionAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }]
})
export class DocumentacionAdminModule { }
