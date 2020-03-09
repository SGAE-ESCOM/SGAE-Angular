import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionAspirantesRoutingModule } from './gestion-aspirantes-routing.module';

/* Components */
import { GestionAspirantesComponent } from './gestion-aspirantes.component';


@NgModule({
  declarations: [GestionAspirantesComponent],
  imports: [
    CommonModule,
    GestionAspirantesRoutingModule
  ]
})
export class GestionAspirantesModule { }
