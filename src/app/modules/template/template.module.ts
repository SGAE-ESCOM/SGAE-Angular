import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateRoutingModule } from './template-routing.module';
import { CardsModule } from '@shared/components/cards/cards.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccesoRestringidoComponent } from './acceso-restringido/acceso-restringido.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    DashboardComponent,
    AccesoRestringidoComponent
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    CardsModule,
    MatTooltipModule
  ]
})
export class TemplateModule { }