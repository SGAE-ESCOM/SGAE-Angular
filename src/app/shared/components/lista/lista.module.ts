import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainListaComponent } from './main-lista/main-lista.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [MainListaComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    DragDropModule
  ],
  exports: [MainListaComponent]
})
export class ListaModule { }
