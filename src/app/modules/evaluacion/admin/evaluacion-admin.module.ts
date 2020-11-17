import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluacionAdminRoutingModule } from './evaluacion-admin-routing.module';
import { GruposComponent, ModalGrupos } from './grupos/grupos.component';
import { AngularMaterialModule } from '@modules/template/angular-material.module';
import { TablasModule } from '@shared/components/tablas/tablas.module';
import { FormGruposComponent } from './grupos/form-grupos/form-grupos.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDinamicoModule } from '@shared/components/form-dinamico/form-dinamico.module';

@NgModule({
  declarations: [GruposComponent, FormGruposComponent, ModalGrupos],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    EvaluacionAdminRoutingModule,
    AngularMaterialModule,
    TablasModule,
    MatDialogModule,
    FormDinamicoModule
  ]
})
export class EvaluacionAdminModule { }
