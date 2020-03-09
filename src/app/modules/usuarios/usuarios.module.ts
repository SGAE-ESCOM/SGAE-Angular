import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosRoutingModule } from './usuarios-routing.module';

/* Components */
import { MainUsuariosComponent } from './main-usuarios/main-usuarios.component';
import { CardsModule } from '@shared/cards/cards.module';
import { GestionAspirantesComponent } from './components/gestion-aspirantes/gestion-aspirantes.component';
import { GestionAdmonComponent } from './components/gestion-admon/gestion-admon.component';


@NgModule({
  declarations: [MainUsuariosComponent, GestionAspirantesComponent, GestionAdmonComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    CardsModule
  ]
})
export class UsuariosModule { }
