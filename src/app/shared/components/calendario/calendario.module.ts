import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CalendarioComponent } from './calendario.component';

@NgModule({
  declarations: [CalendarioComponent],
  exports: [CalendarioComponent],
  imports: [
    CommonModule,
    MatTooltipModule
  ]
})
export class CalendarioModule {
}
