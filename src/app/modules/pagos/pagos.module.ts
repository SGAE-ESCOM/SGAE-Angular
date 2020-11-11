import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagosRoutingModule } from './pagos-routing.module';
import { MainPagosComponent } from './main-pagos/main-pagos.component';
import { CardsModule } from '@shared/components/cards/cards.module';


@NgModule({
  declarations: [MainPagosComponent],
  imports: [
    CommonModule,
    PagosRoutingModule,
    CardsModule
  ]
})
export class PagosModule { }
