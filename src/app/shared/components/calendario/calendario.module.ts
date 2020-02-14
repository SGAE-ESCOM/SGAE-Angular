import { NgModule, ViewChild, ElementRef, AfterContentInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from './calendario.component';

@NgModule({
  declarations: [CalendarioComponent],
  exports: [CalendarioComponent],
  imports: [
    CommonModule
  ]
})
export class CalendarioModule {
}
