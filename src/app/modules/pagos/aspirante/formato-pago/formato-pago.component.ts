import { Component, OnInit  } from '@angular/core';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { CuentaPagos } from '@models/cuentas-pagos/cuenta-pagos';
import { CuentasPagosService } from '@services/pagos/cuentas-pagos.service';
import { BC_FORMATO_PAGO } from '@shared/routing-list/ListLinks';

@Component({
  selector: 'app-formato-pago',
  templateUrl: './formato-pago.component.html',
  styleUrls: ['./formato-pago.component.scss']
})
export class FormatoPagoComponent implements OnInit {

  cuentaPagos: CuentaPagos[] = [];
  cuentaSelec: CuentaPagos = null;
  //con el grupo obtener las cuentas que tengan los mismos grupos asignados

  constructor(private _cuentas: CuentasPagosService) {
    /***************** REVISAR ACCESO SOLO ASPIRANTES *******************/

    BreadcrumbComponent.update(BC_FORMATO_PAGO);
  }

  ngOnInit(): void {
    //Obtener el grupo en el que esta asignado el alumno
    let idsGrupos:any = [
      "aAJHLBz9JLxLGC9UaZ1W",
      "mcNH5Ngja7Gnp9AfrzeN",
      "un7k3fL8NqAbbNFxrB4k"
    ];

    this._cuentas.obtenerCuentasPorIdGrupo(idsGrupos[0]).then((querySnapshot) => {
      let cuentaPagos = [];
      querySnapshot.forEach((doc) => {
        cuentaPagos.push(doc.data());
      });
      this.cuentaPagos = cuentaPagos; 
    }).catch( err =>  {
      console.log(err);
    });
  }

  onChangeCuenta(cuentaPago: any){
    this.cuentaSelec = cuentaPago;
  }

}
