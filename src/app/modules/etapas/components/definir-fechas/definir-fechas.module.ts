import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefinirFechasRoutingModule } from './definir-fechas-routing.module';
import { AngularMaterialModule } from '@template/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarioModule } from '@shared/components/calendario/calendario.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ES_FORMAT } from '@shared/utils/traduccion/calendario-es';

/* Components */
import { DefinirFechasComponent } from './definir-fechas.component';
import { InputFechaModule } from '@shared/components/input-fecha/input-fecha.module';

@NgModule({
  declarations: [DefinirFechasComponent],
  imports: [
    CommonModule,
    DefinirFechasRoutingModule,
    FormsModule, ReactiveFormsModule,
    AngularMaterialModule,
    CalendarioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    InputFechaModule
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: ES_FORMAT }
  ]
})
export class DefinirFechasModule { }
