import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AprobacionRoutingModule } from './aprobacion-routing.module';
import { MainAprobacionComponent } from './main-aprobacion/main-aprobacion.component';
import { TablasModule } from '@shared/components/tablas/tablas.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '@modules/template/angular-material.module';


@NgModule({
  declarations: [MainAprobacionComponent],
  imports: [
    CommonModule,
    AprobacionRoutingModule,
    FormsModule, ReactiveFormsModule,
    TablasModule,
    AngularMaterialModule
  ]
})
export class AprobacionModule { }
