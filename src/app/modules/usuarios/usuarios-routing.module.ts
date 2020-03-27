import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainUsuariosComponent } from './main-usuarios/main-usuarios.component';
import { GestionAdmonComponent } from './components/gestion-admon/gestion-admon.component';
import { GestionAspirantesComponent } from './components/gestion-aspirantes/gestion-aspirantes.component';

const routes: Routes = [
  { path: '', component: MainUsuariosComponent },
  { path: 'gestion-admon', component: GestionAdmonComponent },
  { path: 'gestion-aspirantes', component: GestionAspirantesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
