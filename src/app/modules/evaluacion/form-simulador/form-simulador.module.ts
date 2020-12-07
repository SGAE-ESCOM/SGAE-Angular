import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '@modules/template/angular-material.module';
import { MatRadioModule } from '@angular/material/radio';
import { KatexModule } from 'ng-katex';
import { MainFormSimuladorComponent } from './main-form-simulador/main-form-simulador.component';

@NgModule({
  declarations: [MainFormSimuladorComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    AngularMaterialModule,
    MatRadioModule,
    KatexModule
  ],
  exports: [MainFormSimuladorComponent]
})
export class FormSimuladorModule { }
