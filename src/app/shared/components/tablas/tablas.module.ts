import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainTablasComponent } from './main-tablas/main-tablas.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AngularMaterialModule } from '@modules/template/angular-material.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [MainTablasComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    AngularMaterialModule,
    MatProgressSpinnerModule
  ],
  exports: [MainTablasComponent],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-MX' }]
})
export class TablasModule { }
