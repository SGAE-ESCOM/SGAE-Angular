import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Components view examples */
import { ViewButtonsComponent } from './view/view-buttons/view-buttons.component';
import { DNDListComponent } from './view/dndlist/dndlist.component';
import { FormComponent } from './view/form/form.component';
import { DynamicFormComponent } from './view/dynamic-form/dynamic-form.component';
import { MessagesComponent } from './view/messages/messages.component';
import { CustomThemeComponent } from './view/custom-theme/custom-theme.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  //{ path: 'test', loadChildren: () => import('@modules/test/test.module').then(m => m.TestModule) },
  //Template views
  { path: '', component: DashboardComponent },
  { path: 'test', loadChildren: () => import('@modules/test/test.module').then( m=> m.TestModule) },
  { path: 'view-custom-theme', component: CustomThemeComponent },
  { path: 'view-buttons', component: ViewButtonsComponent },
  { path: 'view-DND-list', component: DNDListComponent },
  { path: 'view-form', component: FormComponent },
  { path: 'dynamic-form', component: DynamicFormComponent },
  { path: 'view-messages', component: MessagesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
