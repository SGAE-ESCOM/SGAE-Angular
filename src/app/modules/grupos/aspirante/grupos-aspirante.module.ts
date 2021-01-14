import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GruposAspiranteRoutingModule } from './grupos-aspirante-routing.module';
import { InscribirGrupoComponent } from './inscribir-grupo/inscribir-grupo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [InscribirGrupoComponent],
  imports: [
    CommonModule,
    GruposAspiranteRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class GruposAspiranteModule { }
