import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GruposRoutingModule } from './grupos-routing.module';
import { MainGruposComponent } from './main-grupos/main-grupos.component';


@NgModule({
  declarations: [MainGruposComponent],
  imports: [
    CommonModule,
    GruposRoutingModule
  ]
})
export class GruposModule { }
