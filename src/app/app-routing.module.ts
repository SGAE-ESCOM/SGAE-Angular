import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Components */
import { DashboardComponent } from './components/dashboard/dashboard.component';

/* Components view examples */
import { ViewButtonsComponent } from './components/shared/view/view-buttons/view-buttons.component';
import { DNDListComponent } from './components/shared/view/dndlist/dndlist.component';
import { FormComponent } from './components/shared/view/form/form.component';


const routes: Routes = [
  { path:'home' , component: DashboardComponent },
  { path:'view-buttons' , component: ViewButtonsComponent },
  { path:'view-DND-list' , component: DNDListComponent },
  { path:'view-form' , component: FormComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
