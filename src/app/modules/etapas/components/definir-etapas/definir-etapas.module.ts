import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefinirEtapasRoutingModule } from './definir-etapas-routing.module';
import { AngularMaterialModule } from '@template/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatStepperModule } from '@angular/material/stepper';

/* Components */
import { DefinirEtapasComponent } from './definir-etapas.component';

@NgModule({
  declarations: [DefinirEtapasComponent],
  imports: [
    CommonModule,
    DefinirEtapasRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatStepperModule
  ]
})
export class DefinirEtapasModule { }
