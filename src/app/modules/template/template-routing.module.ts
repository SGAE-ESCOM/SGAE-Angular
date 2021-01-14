import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Components view examples */
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccesoRestringidoComponent } from './acceso-restringido/acceso-restringido.component';
import { DocumentacionGuard } from '@shared/guards/documentacion.guard';
import { EvaluacionGuard } from '@shared/guards/evaluacion.guard';
import { PagosGuard } from '@shared/guards/pagos.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'documentacion', loadChildren: () => import('@modules/documentacion/documentacion.module').then(m => m.DocumentacionModule), canActivate: [DocumentacionGuard] },
  { path: 'evaluacion', loadChildren: () => import('@modules/evaluacion/evaluacion.module').then(m => m.EvaluacionModule), canActivate: [EvaluacionGuard] },
  { path: 'pagos', loadChildren: () => import('@modules/pagos/pagos.module').then(m => m.PagosModule), canActivate: [PagosGuard] },
  { path: 'convocatoria', loadChildren: () => import('@modules/convocatoria/convocatoria.module').then(m => m.ConvocatoriaModule) },
  { path: 'etapas', loadChildren: () => import('@modules/etapas/etapas.module').then(m => m.EtapasModule) },
  { path: 'usuarios', loadChildren: () => import('@modules/usuarios/usuarios.module').then(m => m.UsuariosModule) },
  { path: 'usuario', loadChildren: () => import('@modules/usuario/usuario.module').then(m => m.UsuarioModule) },
  { path: 'resultados', loadChildren: () => import('@modules/resultados/resultados.module').then(m => m.ResultadosModule) },
  { path: 'grupos', loadChildren: () => import('@modules/grupos/grupos.module').then(m => m.GruposModule) },
  { path: 'acceso-restringido', component: AccesoRestringidoComponent }
  //Agregar SinPermisos
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
