import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscribirGrupoRoutingModule } from './inscribir-grupo-routing.module';
import { MainInscribirGrupoComponent } from './main-inscribir-grupo/main-inscribir-grupo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [MainInscribirGrupoComponent],
  imports: [
    CommonModule,
    InscribirGrupoRoutingModule,
    FormsModule, ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class InscribirGrupoModule { }
