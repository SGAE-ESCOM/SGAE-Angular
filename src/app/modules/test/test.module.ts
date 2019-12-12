import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { CrudComponent } from './crud/crud.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { TestComponent } from './test/test.component';
import { AngularMaterialModule } from '@template/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CrudComponent, DynamicFormComponent, TestComponent],
  imports: [
    CommonModule,
    TestRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class TestModule { }
