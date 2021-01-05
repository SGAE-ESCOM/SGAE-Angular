import { Component, OnInit  } from '@angular/core';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { CuentaPagos } from '@models/cuentas-pagos/cuenta-pagos';
import { UsuarioInterface } from '@models/persona/usuario';
import { CuentasPagosService } from '@services/pagos/cuentas-pagos.service';
import { BC_FORMATO_PAGO, BC_PAGOS } from '@shared/routing-list/ListLinks';
import { AuthService } from '@services/auth.service';
import { sinAcceso } from '@shared/admin-permissions/permissions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formato-pago',
  templateUrl: './formato-pago.component.html',
  styleUrls: ['./formato-pago.component.scss']
})
export class FormatoPagoComponent implements OnInit {

  grupoId = "";
  sinCuentaPagos: boolean = true;
  cuentaPagos: CuentaPagos[] = [];
  cuentaSelec: CuentaPagos = null;
  //con el grupo obtener las cuentas que tengan los mismos grupos asignados

  constructor(private _cuentas: CuentasPagosService, private _authService: AuthService, private router: Router) {
    /***************** REVISAR ACCESO SOLO ASPIRANTES *******************/
    let usuario = this._authService.getUsuarioC();
    //Comprobar Permisos
    BreadcrumbComponent.update(BC_PAGOS);
    if(usuario.rol != 'aspirante') sinAcceso(router);
    
    BreadcrumbComponent.update(BC_FORMATO_PAGO);
  }

  ngOnInit(): void {
    //Obtener el grupo en el que esta asignado el alumno
    // let idsGrupos:any = [
    //   "aAJHLBz9JLxLGC9UaZ1W",
    //   "mcNH5Ngja7Gnp9AfrzeN",
    //   "un7k3fL8NqAbbNFxrB4k"
    // ];
    let usuario = this._authService.getUsuarioC();
    if(typeof usuario.grupo !== 'undefined' && typeof usuario.grupo.id !== 'undefined'){
      this.grupoId = usuario.grupo.id;
      this._cuentas.obtenerCuentasPorIdGrupo(this.grupoId).then((querySnapshot) => {
        let cuentaPagos = [];
        querySnapshot.forEach((doc) => {
          cuentaPagos.push(doc.data());
        });
        //Revisar que existan cuenta de pagos
        if(cuentaPagos.length != 0){
          this.cuentaPagos = cuentaPagos;
          this.sinCuentaPagos = false;
        }
      }).catch( err =>  {
        console.log(err);
      });
    }
  }

  onChangeCuenta(cuentaPago: any){
    this.cuentaSelec = cuentaPago;
  }

}
