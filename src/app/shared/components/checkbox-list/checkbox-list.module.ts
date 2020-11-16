import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MainCheckboxListComponent } from './main-checkbox-list/main-checkbox-list.component';

@NgModule({
  declarations: [MainCheckboxListComponent],
  imports: [
    CommonModule,
    MatCheckboxModule
  ],
  exports: [MainCheckboxListComponent]
})
export class CheckboxListModule { }