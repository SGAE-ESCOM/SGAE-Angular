import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSimuladorComponent } from './main-simulador/main-simulador.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '@modules/template/angular-material.module';
import { MatRadioModule } from '@angular/material/radio';
import { CrearSimuladorComponent } from './crear-simulador/crear-simulador.component';

@NgModule({
  declarations: [MainSimuladorComponent, CrearSimuladorComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    AngularMaterialModule,
    MatRadioModule
  ],
  exports: [MainSimuladorComponent, CrearSimuladorComponent]
})
export class FormSimuladorModule { }
