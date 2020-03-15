import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtapasRoutingModule } from './etapas-routing.module';
import { CardsModule } from '@shared/cards/cards.module';
import { MainEtapasComponent } from './main-etapas/main-etapas.component';

@NgModule({
  declarations: [MainEtapasComponent],
  imports: [
    CommonModule,
    EtapasRoutingModule,
    CardsModule
  ]
})
export class EtapasModule { }
