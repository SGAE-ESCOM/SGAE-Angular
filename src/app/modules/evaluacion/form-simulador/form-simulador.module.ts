import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSimuladorComponent } from './main-simulador/main-simulador.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '@modules/template/angular-material.module';
import { MatRadioModule } from '@angular/material/radio';
import { KatexModule } from 'ng-katex';

@NgModule({
  declarations: [MainSimuladorComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    AngularMaterialModule,
    MatRadioModule,
    KatexModule
  ],
  exports: [MainSimuladorComponent]
})
export class FormSimuladorModule { }
