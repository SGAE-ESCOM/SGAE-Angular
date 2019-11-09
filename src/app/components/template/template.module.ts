import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Routing */
import { TemplateRoutingModule } from './template-routing.module';
import { AngularMaterialModule } from '@app/components/template/angular-material.module';

/* Components */
import { ViewButtonsComponent } from './view/view-buttons/view-buttons.component';
import { DNDListComponent } from './view/dndlist/dndlist.component';
import { FormComponent } from './view/form/form.component';
import { DialogForm } from './view/form/form.component';
import { DynamicFormComponent } from './view/dynamic-form/dynamic-form.component';

@NgModule({
  declarations: [
    ViewButtonsComponent,
    DNDListComponent,
    FormComponent,
    DialogForm,
    DynamicFormComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    TemplateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TemplateModule { }
