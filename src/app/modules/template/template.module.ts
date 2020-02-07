import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Routing */
import { TemplateRoutingModule } from './template-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { AngularMaterialModule } from './angular-material.module';

/* Components */
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    AngularMaterialModule,
    TemplateRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TemplateModule { }