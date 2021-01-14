import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GruposAdminRoutingModule } from './grupos-admin-routing.module';
import { GruposComponent, ModalGrupos } from './grupos/grupos.component';
import { FormGruposAdminComponent } from './grupos/form-grupos/form-grupos-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '@modules/template/angular-material.module';
import { TablasModule } from '@shared/components/tablas/tablas.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormDinamicoModule } from '@shared/components/form-dinamico/form-dinamico.module';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [GruposComponent, FormGruposAdminComponent, ModalGrupos],
  imports: [
    CommonModule,
    GruposAdminRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    AngularMaterialModule,
    TablasModule,
    MatDialogModule,
    FormDinamicoModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class GruposAdminModule { }
