import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainUsuariosComponent } from './main-usuarios/main-usuarios.component';
import { GestionAdmonComponent } from './components/gestion-admon/gestion-admon.component';
import { GestionAspirantesComponent } from './components/gestion-aspirantes/gestion-aspirantes.component';
import { RegistrarAdmonComponent } from './components/registrar-admon/registrar-admon.component';
import { EditarAdmonComponent } from './components/editar-admon/editar-admon.component';

const routes: Routes = [
  { path: '', component: MainUsuariosComponent },
  { path: 'gestion-admon', component: GestionAdmonComponent },
  { path: 'gestion-admon/editar/:id', component:  EditarAdmonComponent},
  { path: 'gestion-aspirantes', component: GestionAspirantesComponent },
  { path: 'gestion-admon/registrar', component: RegistrarAdmonComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
