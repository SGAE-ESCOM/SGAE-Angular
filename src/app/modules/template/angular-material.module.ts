import { NgModule } from '@angular/core';

/* Material modules */
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  exports:[
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule
  ]
})
export class AngularMaterialModule {}