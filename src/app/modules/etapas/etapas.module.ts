import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtapasRoutingModule } from './etapas-routing.module';
import { AngularMaterialModule } from '@template/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material';

/* Components */
import { MainEtapasComponent } from './main-etapas/main-etapas.component';

@NgModule({
  declarations: [MainEtapasComponent],
  imports: [
    CommonModule,
    EtapasRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }]
})
export class EtapasModule { }
