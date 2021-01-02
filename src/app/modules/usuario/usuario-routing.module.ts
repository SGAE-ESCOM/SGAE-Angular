import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurarUsuarioComponent } from './components/configurar-usuario/configurar-usuario.component';

const routes: Routes = [
  { path: 'configurar-usuario', component: ConfigurarUsuarioComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
