import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainInputHoraComponent } from './main-input-hora/main-input-hora.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [MainInputHoraComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [MainInputHoraComponent]
})
export class InputHoraModule { }
