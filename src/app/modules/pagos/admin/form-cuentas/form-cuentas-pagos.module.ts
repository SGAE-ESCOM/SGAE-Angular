import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCuentasPagosComponent } from './form-cuentas-pagos.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';


@NgModule({
  declarations: [FormCuentasPagosComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule
  ],
  exports: [FormCuentasPagosComponent],
  entryComponents: [FormCuentasPagosComponent]
})
export class FormCuentasPagosModule { }
