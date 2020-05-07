import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Components view examples */
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccesoRestringidoComponent } from './acceso-restringido/acceso-restringido.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'documentacion', loadChildren: () => import('@modules/documentacion/documentacion.module').then( m=> m.DocumentacionModule) },
  { path: 'evaluacion', loadChildren: () => import('@modules/evaluacion/evaluacion.module').then( m=> m.EvaluacionModule) },
  { path: 'pagos', loadChildren: () => import('@modules/pagos/pagos.module').then( m=> m.PagosModule) },
  { path: 'convocatoria', loadChildren: () => import('@modules/convocatoria/convocatoria.module').then( m=> m.ConvocatoriaModule) },
  { path: 'etapas', loadChildren: () => import('@modules/etapas/etapas.module').then( m=> m.EtapasModule) },
  { path: 'usuarios', loadChildren: () => import('@modules/usuarios/usuarios.module').then( m=> m.UsuariosModule) },
  { path: 'acceso-restringido', component: AccesoRestringidoComponent }
  //Agregar SinPermisos
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
