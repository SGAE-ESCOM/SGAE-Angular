import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionAdmonRoutingModule } from './gestion-admon-routing.module';

/* Components */
import { GestionAdmonComponent } from './gestion-admon.component';


@NgModule({
  declarations: [GestionAdmonComponent],
  imports: [
    CommonModule,
    GestionAdmonRoutingModule
  ]
})
export class GestionAdmonModule { }
