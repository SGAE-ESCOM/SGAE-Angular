import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefinirEtapasRoutingModule } from './definir-etapas-routing.module';
import { AngularMaterialButtonModule } from '@modules/template/angular-material-button.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatStepperModule } from '@angular/material/stepper';

/* Components */
import { DefinirEtapasComponent } from './definir-etapas.component';

@NgModule({
  declarations: [DefinirEtapasComponent],
  imports: [
    CommonModule,
    DefinirEtapasRoutingModule,
    FormsModule, ReactiveFormsModule,
    AngularMaterialButtonModule,
    MatListModule,
    DragDropModule,
    MatStepperModule
  ]
})
export class DefinirEtapasModule { }
