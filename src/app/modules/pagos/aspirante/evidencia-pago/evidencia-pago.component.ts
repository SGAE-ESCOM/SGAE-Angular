import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { EstadoPago } from '@models/cuentas-pagos/enums/estado-pago.enum';
import { EvidenciaPago } from '@models/cuentas-pagos/evidencia-pago';
import { UsuarioInterface } from '@models/persona/usuario';
import { AuthService } from '@services/auth.service';
import { EvidenciasPagosService } from '@services/pagos/evidencias-pagos.service';
import { UsuarioService } from '@services/usuario/usuario.service';
import { BC_EVIDENCIA_PAGO, EVIDENCIA_PAGO } from '@shared/routing-list/ListLinks';
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
      private _authService: AuthService) { 
    /***************** REVISAR ACCESO SOLO ASPIRANTES *******************/

    this.usuario = this._authService.getUsuarioC();
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
          this._usuarioService.updateEstadoDocumentacion(this.usuario, EstadoPago.REVISION);
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

  singleFileDropError(){
    this._toastr.error("Arrastre solo un archivo.");
  }

  fileLimitUploadError(){
    this._toastr.error("Ya se subió un archivo.");
  }

  typeFilesError(){
    this._toastr.error("Solo se soportan archivos con extensión pdf.");
  }

  fileUploadError(){
    this._toastr.error("Ocurrio un error al cargar el archivo.");
  }

}
