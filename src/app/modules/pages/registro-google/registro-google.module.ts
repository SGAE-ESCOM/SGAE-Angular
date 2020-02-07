import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroGoogleRoutingModule } from './registro-google-routing.module';
import { RegistroGoogleComponent } from './registro-google.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialTemplateModule } from '@modules/template/angular-material-template.module';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [RegistroGoogleComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule,
    AngularMaterialTemplateModule,
    RegistroGoogleRoutingModule
  ]
})
export class RegistroGoogleModule { }
