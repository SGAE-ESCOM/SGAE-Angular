import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtapasRoutingModule } from './etapas-routing.module';

/* Components */
import { MainEtapasComponent } from './main-etapas/main-etapas.component';
import { CardsModule } from '@shared/cards/cards.module';

@NgModule({
  declarations: [MainEtapasComponent],
  imports: [
    CommonModule,
    EtapasRoutingModule,
    CardsModule
  ]
})
export class EtapasModule { }
