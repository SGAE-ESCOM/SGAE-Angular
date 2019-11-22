import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Routing */
import { TemplateRoutingModule } from './template-routing.module';
import { AngularMaterialModule } from './angular-material.module'
import { MaterialMessagesModule } from './material-messages.module'

/* Components */
import { ViewButtonsComponent } from './view/view-buttons/view-buttons.component';
import { DNDListComponent } from './view/dndlist/dndlist.component';
import { FormComponent } from './view/form/form.component';
import { DialogForm } from './view/form/form.component';
import { DynamicFormComponent } from './view/dynamic-form/dynamic-form.component';
import { MessagesComponent } from './view/messages/messages.component';
import { CustomThemeComponent } from './view/custom-theme/custom-theme.component';

@NgModule({
  declarations: [
    ViewButtonsComponent,
    DNDListComponent,
    FormComponent,
    DialogForm,
    DynamicFormComponent,
    MessagesComponent,
    CustomThemeComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    MaterialMessagesModule,
    TemplateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TemplateModule { }
