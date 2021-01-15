import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from '@shared/guards/logged-in.guard';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

const routes: Routes = [
  { path: '', component: LandingpageComponent, canActivate: [LoggedInGuard] },
  { path: 'login',  loadChildren: () => import('./login/login.module').then(m => m.LoginModule), canActivate: [LoggedInGuard] },
  { path: 'registro', loadChildren: () => import('./registro/registro.module').then(m => m.RegistroModule), canActivate: [LoggedInGuard]},
  { path: 'registro-goolge', loadChildren: () => import('./registro-google/registro-google.module').then( m => m.RegistroGoogleModule) },
  { path: 'password-reset', component:  PasswordResetComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
