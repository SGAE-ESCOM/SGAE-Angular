import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule
  ]
})
export class MaterialMessagesModule { }