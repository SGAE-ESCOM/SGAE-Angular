import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GruposRoutingModule } from './grupos-routing.module';
import { GruposAdminModule } from './admin/grupos-admin.module';
import { GruposAspiranteModule } from './aspirante/grupos-aspirante.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GruposRoutingModule,
    GruposAdminModule,
    GruposAspiranteModule
  ]
})
export class GruposModule { }
