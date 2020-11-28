import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from "@template/angular-material.module";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    AngularMaterialModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-MX' }]
})
export class FormRequisitosModule { }