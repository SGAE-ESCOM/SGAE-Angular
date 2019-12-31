import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Routing */
import { TemplateRoutingModule } from './template-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { AngularMaterialModule } from './angular-material.module';
import { MaterialMessagesModule } from './material-messages.module';

/* Components */
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardsComponent } from './cards/cards.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CardsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    AngularMaterialModule,
    MaterialMessagesModule,
    TemplateRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ CardsComponent ],
  entryComponents: [ CardsComponent ]
})
export class TemplateModule { }
