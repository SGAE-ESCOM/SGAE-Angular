import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "@breadcrumb/breadcrumb.component";
import { CuentaPagos } from '@models/cuentas-pagos/cuenta-pagos';
import { BC_GESTIONAR_CUENTAS } from '@shared/routing-list/ListLinks';

@Component({
  selector: 'app-gestionar-cuentas',
  templateUrl: './gestionar-cuentas.component.html',
  styleUrls: ['./gestionar-cuentas.component.scss']
})
export class GestionarCuentasComponent implements OnInit {

  cuentas;

  constructor() { 
    /***************** REVISAR PERMISOS *******************/

    BreadcrumbComponent.update(BC_GESTIONAR_CUENTAS);
    this.cuentas = [new CuentaPagos('1','Cuenta Banamex', 'Banamex', '1234 5678 1234 4567', 'ESCOM1234'), new CuentaPagos('2','Cuenta Bancomer', 'Bancomer', '1234 5678 1234 4567', 'UPICSSA1234')];
  }

  ngOnInit(): void {
  }

}
