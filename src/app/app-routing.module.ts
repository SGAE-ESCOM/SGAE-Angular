import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Components */
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'home', component: DashboardComponent },
  { path: 'template', loadChildren: () => import('./modules/template/template.module').then(m => m.TemplateModule) },
  { path: 'test', loadChildren: () => import('./modules/test/test.module').then(m => m.TestModule) },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    //useHash: true,
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    //scrollOffset: [0, 64]
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }