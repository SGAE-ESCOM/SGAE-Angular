import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Components view examples */
import { ViewButtonsComponent } from './view/view-buttons/view-buttons.component';
import { DNDListComponent } from './view/dndlist/dndlist.component';
import { FormComponent } from './view/form/form.component';
import { DynamicFormComponent } from './view/dynamic-form/dynamic-form.component';

const routes: Routes = [
  { path:'view-buttons' , component: ViewButtonsComponent },
  { path:'view-DND-list' , component: DNDListComponent },
  { path:'view-form' , component: FormComponent },
  { path:'dynamic-form' , component: DynamicFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
