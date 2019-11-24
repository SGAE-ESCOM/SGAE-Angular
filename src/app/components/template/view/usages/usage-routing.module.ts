import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartComponent } from './components/start/start.component';
import { StructureComponent } from './components/structure/structure.component';

const routes: Routes = [
  { path: 'view-start', component: StartComponent },
  { path: 'view-structure', component: StructureComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsageRoutingModule { }
