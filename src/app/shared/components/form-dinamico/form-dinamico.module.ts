import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDinamicoComponent } from './form-dinamico.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from "@template/angular-material.module";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { PipesModule } from "@shared/pipes/pipes.module";
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ES_FORMAT } from '@shared/utils/traduccion/calendario-es';

@NgModule({
  declarations: [FormDinamicoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MaterialFileInputModule,
    PipesModule
  ],
  exports: [FormDinamicoComponent],
  entryComponents: [FormDinamicoComponent],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: ES_FORMAT }  
  ]
})
export class FormDinamicoModule { }
