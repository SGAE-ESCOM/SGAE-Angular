import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsageRoutingModule } from './usage-routing.module';
import { StartComponent } from './components/start/start.component';
import { StructureComponent } from './components/structure/structure.component';


@NgModule({
  declarations: [StartComponent, StructureComponent],
  imports: [
    CommonModule,
    UsageRoutingModule
  ]
})
export class UsageModule { }
