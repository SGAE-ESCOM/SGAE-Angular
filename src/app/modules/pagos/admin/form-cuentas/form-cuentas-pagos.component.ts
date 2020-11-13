import { Component, Input, OnInit } from '@angular/core';
import { CuentaPagos } from '@models/cuentas-pagos/cuenta-pagos';
import { cardAnimation } from '@shared/utils/animations/router.animations';

@Component({
  selector: 'app-form-cuentas',
  templateUrl: './form-cuentas-pagos.component.html',
  styleUrls: ['./form-cuentas-pagos.component.scss'],
  animations: [ cardAnimation() ]
})
export class FormCuentasPagosComponent implements OnInit {

  @Input() cuentas: CuentaPagos[];

  constructor() { }

  ngOnInit(): void {
    
  }

  editarCuenta(id: string){

  }

}
