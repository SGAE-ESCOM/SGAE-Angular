import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefinirFechasRoutingModule } from './definir-fechas-routing.module';
import { AngularMaterialModule } from '@template/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarioModule } from '@shared/components/calendario/calendario.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material';

/* Components */
import { DefinirFechasComponent } from './definir-fechas.component';

@NgModule({
  declarations: [DefinirFechasComponent],
  imports: [
    CommonModule,
    DefinirFechasRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarioModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }]
})
export class DefinirFechasModule { }
