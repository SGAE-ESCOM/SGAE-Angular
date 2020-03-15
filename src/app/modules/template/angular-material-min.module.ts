import { NgModule } from '@angular/core';

/* Material modules */
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [],
  exports:[
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ]
})
export class AngularMaterialMinModule {}