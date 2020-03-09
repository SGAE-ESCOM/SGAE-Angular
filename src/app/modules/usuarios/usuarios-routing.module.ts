import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainUsuariosComponent } from './main-usuarios/main-usuarios.component';

const routes: Routes = [
  { path: '', component: MainUsuariosComponent },
  { path: 'gestion-admon', loadChildren: () => import('./components/gestion-admon/gestion-admon.module').then( m => m.GestionAdmonModule ) },
  { path: 'gestion-aspirantes', loadChildren: () => import('./components/gestion-aspirantes/gestion-aspirantes.module').then( m => m.GestionAspirantesModule ) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
