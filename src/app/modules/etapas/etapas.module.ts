import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtapasRoutingModule } from './etapas-routing.module';
import { AngularMaterialModule } from '@template/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatStepperModule } from '@angular/material/stepper';

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
    MatStepperModule
  ]
})
export class EtapasModule { }
