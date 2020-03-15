import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';
import { AngularMaterialMinModule } from '@modules/template/angular-material-min.module';

@NgModule({
  declarations: [RegistroComponent],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    AngularMaterialMinModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RegistroModule { }
