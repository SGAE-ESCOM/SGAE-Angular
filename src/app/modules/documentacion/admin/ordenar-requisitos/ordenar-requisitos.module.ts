import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdenarRequisitosRoutingModule } from './ordenar-requisitos-routing.module';
import { OrdenarRequisitosComponent } from './ordenar-requisitos.component';
import { AngularMaterialButtonModule } from "@template/angular-material-button.module";
import { MatListModule } from '@angular/material/list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PipesModule } from '@shared/pipes/pipes.module';

@NgModule({
  declarations: [OrdenarRequisitosComponent],
  imports: [
    CommonModule,
    OrdenarRequisitosRoutingModule,
    AngularMaterialButtonModule,
    MatListModule,
    DragDropModule,
    PipesModule
  ]
})
export class OrdenarRequisitosModule { }
