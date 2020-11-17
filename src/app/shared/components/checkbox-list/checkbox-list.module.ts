import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MainCheckboxListComponent } from './main-checkbox-list/main-checkbox-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MainCheckboxListComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    FormsModule
  ],
  exports: [MainCheckboxListComponent]
})
export class CheckboxListModule { }