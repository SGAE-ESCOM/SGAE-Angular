import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Routing */
import { TemplateRoutingModule } from './template-routing.module';
import { AngularMaterialModule } from './angular-material.module';
import { MaterialMessagesModule } from './material-messages.module';

/* Components */
import { ViewButtonsComponent } from './view/view-buttons/view-buttons.component';
import { DNDListComponent } from './view/dndlist/dndlist.component';
import { FormComponent } from './view/form/form.component';
import { DialogForm } from './view/form/form.component';
import { DynamicFormComponent } from './view/dynamic-form/dynamic-form.component';
import { MessagesComponent } from './view/messages/messages.component';
import { CustomThemeComponent } from './view/custom-theme/custom-theme.component';
import { UsageModule } from './view/usages/usage.module';
import { HomeComponent } from './home/home.component';
import { TestComponent } from '@modules/test/test/test.component';
import { DashboardComponent } from '@components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    ViewButtonsComponent,
    DNDListComponent,
    FormComponent,
    DialogForm,
    DynamicFormComponent,
    MessagesComponent,
    CustomThemeComponent,
    HomeComponent,
    TestComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    MaterialMessagesModule,
    TemplateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UsageModule,
  ]
})
export class TemplateModule { }
