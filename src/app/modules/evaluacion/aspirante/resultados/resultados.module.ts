import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultadosRoutingModule } from './resultados-routing.module';
import { MainResultadosComponent, ModalResultado } from './main-resultados/main-resultados.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [MainResultadosComponent, ModalResultado],
  imports: [
    CommonModule,
    ResultadosRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class ResultadosModule { }
