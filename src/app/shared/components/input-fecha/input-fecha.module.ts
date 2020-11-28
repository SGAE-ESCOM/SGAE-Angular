import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainInputFechaComponent } from './main-input-fecha/main-input-fecha.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { ES_FORMAT } from '@shared/utils/traduccion/calendario-es';

@NgModule({
  declarations: [MainInputFechaComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: ES_FORMAT }  
  ],
  exports: [MainInputFechaComponent]
})
export class InputFechaModule { }
