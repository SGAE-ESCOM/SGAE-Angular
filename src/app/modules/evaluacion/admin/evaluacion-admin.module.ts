import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluacionAdminRoutingModule } from './evaluacion-admin-routing.module';
import { GruposComponent } from './grupos/grupos.component';
import { AngularMaterialModule } from '@modules/template/angular-material.module';


@NgModule({
  declarations: [GruposComponent],
  imports: [
    CommonModule,
    EvaluacionAdminRoutingModule,
    AngularMaterialModule
  ]
})
export class EvaluacionAdminModule { }
