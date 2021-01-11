import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionAspirantesRoutingModule } from './gestion-aspirantes-routing.module';
import { ModalVisualizarEstados } from './asignar-aspirantes/asignar-aspirantes.component';
import { UsuariosRoutingModule } from '../usuarios-routing.module';
import { CardsModule } from '@shared/components/cards/cards.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '@modules/template/angular-material.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MainGestionAspirantesComponent } from './main-gestion-aspirantes/main-gestion-aspirantes.component';
import { AsignarAspirantesComponent } from './asignar-aspirantes/asignar-aspirantes.component';
import { RevisarAspirantesComponent } from './revisar-aspirantes/revisar-aspirantes.component';
import { VerAspiranteComponent } from './ver-aspirante/ver-aspirante.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ModalVerDocumento } from '@shared/components/drag-and-drop-files/drag-and-drop-files/drag-and-drop-files.component';


@NgModule({
  declarations: [RevisarAspirantesComponent, MainGestionAspirantesComponent, ModalVisualizarEstados, AsignarAspirantesComponent, VerAspiranteComponent, ModalVerDocumento],
  imports: [
    CommonModule,
    GestionAspirantesRoutingModule,
    CommonModule,
    UsuariosRoutingModule,
    CardsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-MX' }]
})
export class GestionAspirantesModule { }
