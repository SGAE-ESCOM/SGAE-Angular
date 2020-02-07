import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagosRoutingModule } from './pagos-routing.module';
import { MainPagosComponent } from './main-pagos/main-pagos.component';


@NgModule({
  declarations: [MainPagosComponent],
  imports: [
    CommonModule,
    PagosRoutingModule
  ]
})
export class PagosModule { }
