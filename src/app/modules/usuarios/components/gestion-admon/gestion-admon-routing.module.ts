import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionAdmonComponent } from './gestion-admon.component';


const routes: Routes = [{ path: '', component: GestionAdmonComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionAdmonRoutingModule { }
