import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { ConfigurarUsuarioComponent } from './components/configurar-usuario/configurar-usuario.component';
import { AngularMaterialModule } from '@modules/template/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [ConfigurarUsuarioComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    AngularMaterialModule,
    FormsModule,
    MatTooltipModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class UsuarioModule { }
