import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { AngularMaterialTemplateModule } from '@modules/template/angular-material-template.module';
import { MatInputModule } from '@angular/material/input';
import { CalendarioModule } from "@shared/components/calendario/calendario.module";
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { AngularMaterialMinModule } from '@modules/template/angular-material-min.module';

@NgModule({
  declarations: [LandingpageComponent, PasswordResetComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    AngularMaterialTemplateModule,
    MatInputModule,
    CalendarioModule,
    CommonModule,
    AngularMaterialMinModule
  ]
})
export class PagesModule { }