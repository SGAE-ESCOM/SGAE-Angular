import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosRoutingModule } from './usuarios-routing.module';

/* Components */
import { MainUsuariosComponent } from './main-usuarios/main-usuarios.component';
import { CardsModule } from '@shared/cards/cards.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '@modules/template/angular-material.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PipesModule } from '@shared/pipes/pipes.module';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { GestionAdmonComponent } from './components/gestion-admon/gestion-admon.component';
import { GestionAspirantesComponent } from './components/gestion-aspirantes/gestion-aspirantes.component';
import { RegistrarAdmonComponent } from './components/registrar-admon/registrar-admon.component';


@NgModule({
  declarations: [MainUsuariosComponent, GestionAdmonComponent, GestionAspirantesComponent, RegistrarAdmonComponent],
  imports: [
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
    MatSortModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-MX' }]
})
export class UsuariosModule { }
