import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooleanPipe } from './boolean.pipe';
import { TipoPipe } from './tipo.pipe';

@NgModule({
  declarations: [BooleanPipe, TipoPipe],
  imports: [CommonModule],
  exports: [BooleanPipe, TipoPipe]
})
export class PipesModule { }
