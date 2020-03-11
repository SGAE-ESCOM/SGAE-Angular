import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosRoutingModule } from './usuarios-routing.module';

/* Components */
import { MainUsuariosComponent } from './main-usuarios/main-usuarios.component';
import { CardsModule } from '@shared/cards/cards.module';


@NgModule({
  declarations: [MainUsuariosComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    CardsModule
  ]
})
export class UsuariosModule { }
