import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroGoogleComponent } from './registro-google.component';


const routes: Routes = [
  { path: '', component: RegistroGoogleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroGoogleRoutingModule { }
