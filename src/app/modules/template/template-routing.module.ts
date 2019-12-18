import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Components view examples */
import { ViewButtonsComponent } from './view/view-buttons/view-buttons.component';
import { DNDListComponent } from './view/dndlist/dndlist.component';
import { FormComponent } from './view/form/form.component';
import { DynamicFormComponent } from './view/dynamic-form/dynamic-form.component';
import { MessagesComponent } from './view/messages/messages.component';
import { CustomThemeComponent } from './view/custom-theme/custom-theme.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from '@modules/test/test/test.component';

const routes: Routes = [
  { path:'' , component: HomeComponent },
  //{ path: 'test', loadChildren: () => import('@modules/test/test.module').then(m => m.TestModule) },
  //Template views
  { path:'test' , component: TestComponent },
  { path:'view-custom-theme' , component: CustomThemeComponent },
  { path:'view-buttons' , component: ViewButtonsComponent },
  { path:'view-DND-list' , component: DNDListComponent },
  { path:'view-form' , component: FormComponent },
  { path:'dynamic-form' , component: DynamicFormComponent },
  { path:'view-messages' , component: MessagesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
