import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragAndDropFilesComponent } from './drag-and-drop-files/drag-and-drop-files.component';
import { DndDirective } from './drag-and-drop-files/dnd.directive';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ProgressComponent } from './drag-and-drop-files/progress/progress.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [DragAndDropFilesComponent, DndDirective, ProgressComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [DragAndDropFilesComponent],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-MX' }]
})
export class DragAndDropModule { }
