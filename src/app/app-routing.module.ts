import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Components */
import { DashboardComponent } from './components/dashboard/dashboard.component';

/* Components view examples */
import { ViewButtonsComponent } from './components/shared/view-buttons/view-buttons.component';

const routes: Routes = [
  { path:'home' , component: DashboardComponent },
  { path:'view-buttons' , component: ViewButtonsComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
