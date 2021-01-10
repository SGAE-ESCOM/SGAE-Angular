import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { EstadoPago } from '@models/cuentas-pagos/enums/estado-pago.enum';
import { EvidenciaPago } from '@models/cuentas-pagos/evidencia-pago';
import { UsuarioInterface } from '@models/persona/usuario';
import { Alert } from '@models/utils/Alert';
import { AuthService } from '@services/auth.service';
import { CuentasPagosService } from '@services/pagos/cuentas-pagos.service';
import { EvidenciasPagosService } from '@services/pagos/evidencias-pagos.service';
import { UsuarioService } from '@services/usuario/usuario.service';
import { sinAcceso } from '@shared/admin-permissions/permissions';
import { BC_EVIDENCIA_PAGO, BC_PAGOS, EVIDENCIA_PAGO } from '@shared/routing-list/ListLinks';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evidencia-pago',
  templateUrl: './evidencia-pago.component.html',
  styleUrls: ['./evidencia-pago.component.scss']
})
export class EvidenciaPagoComponent implements OnInit {

  private usuario: UsuarioInterface;
  public estadosPagos = EstadoPago;
  public estadoPago: string;
  public comentarios: string;

  constructor(private _toastr: ToastrService, private _evidenciasPagos: EvidenciasPagosService, private _usuarioService: UsuarioService,
      private _authService: AuthService, private router: Router, private _cuentas: CuentasPagosService) { 
    /***************** REVISAR ACCESO SOLO ASPIRANTES *******************/

    this.usuario = this._authService.getUsuarioC();
    //Comprobar Permisos
    BreadcrumbComponent.update(BC_PAGOS);
    if(this.usuario.rol != 'aspirante') sinAcceso(router);

    if(typeof this.usuario.estado !== 'undefined' && typeof this.usuario.estado.pago !== 'undefined')
      this.estadoPago = this.usuario.estado.pago;
    else
      this.estadoPago = this.estadosPagos.PENDIENTE;

    if(this.estadoPago == this.estadosPagos.INVALIDA){
      this._evidenciasPagos.getEvidencia(this.usuario.id).then(value => {
        let pago: EvidenciaPago = value.data();
        this.comentarios = pago.comentarios;
        // console.log(pago);
      }).catch(error => {
        console.log(error);
      })
    }

    BreadcrumbComponent.update(BC_EVIDENCIA_PAGO);
  }

  ngOnInit(): void {
    let usuario = this._authService.getUsuarioC();
    if(typeof usuario.grupo !== 'undefined' && typeof usuario.grupo.id !== 'undefined'){
      this._cuentas.obtenerCuentasPorIdGrupo(usuario.grupo.id).then((querySnapshot) => {
        let cuentaPagos = [];
        querySnapshot.forEach((doc) => {
          cuentaPagos.push(doc.data());
        });
        if(cuentaPagos.length == 0) this.router.navigate(['/app/pagos/formato-pago']);
      }).catch( err =>  {
        console.log(err);
      });
    }
    else this.router.navigate(['/app/pagos/formato-pago']);
  }

  subirArchivo(files: File[]){
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = () => {
      ; //base64encoded string
      let value: EvidenciaPago = {
        nombre: files[0].name,
        archivo: reader.result.toString(),
        comentarios: '',
        valido: false
      }

      this._evidenciasPagos.save(value, this.usuario.id)
        .then(result => {
          this._toastr.info("Evidencia de pago enviada");
          this._usuarioService.updateEstadoPago(this.usuario, EstadoPago.REVISION);
          this.estadoPago = this.estadosPagos.REVISION
        })
        .catch(error => {
          this._toastr.error("El archivo es demasiado pesado.");
        });
    };

    reader.onerror = (error) => {
      this._toastr.error("No se pudo subir el archivo, intentelo mas tarde.");
    };
  }

  componentError(error){
    this._toastr.error(error);
  }

}
