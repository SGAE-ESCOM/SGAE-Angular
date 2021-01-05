import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { EstadoPago } from '@models/cuentas-pagos/enums/estado-pago.enum';
import { EvidenciaPago } from '@models/cuentas-pagos/evidencia-pago';
import { UsuarioInterface } from '@models/persona/usuario';
import { AuthService } from '@services/auth.service';
import { EvidenciasPagosService } from '@services/pagos/evidencias-pagos.service';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { UsuarioService } from '@services/usuario/usuario.service';
import { comprobarPermisos, GESTION_PAGOS, sinAcceso } from '@shared/admin-permissions/permissions';
import { BC_PAGOS, BC_VALIDAR_PAGO_ASPIRANTE } from '@shared/routing-list/ListLinks';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-validar-pago-aspirante',
  templateUrl: './validar-pago-aspirante.component.html',
  styleUrls: ['./validar-pago-aspirante.component.scss']
})
export class ValidarPagoAspiranteComponent implements OnInit {

  //Variables para las tablas
  requisitosTabla;

  //Variables de logica validacion
  evidenciaPagoObject: EvidenciaPago = null;
  usuario: UsuarioInterface;

  constructor(public dialog: MatDialog, private _evidenciasPagos: EvidenciasPagosService, private _personaService: UsuarioService, 
      private route: ActivatedRoute, private router: Router, private _toast: ToastrService, private _swal: SweetalertService, 
      private _authServices: AuthService, private _router:Router) { 
    //REVISAR PERMISOS DE ADMINISTRADOR
        
    let usuario = this._authServices.getUsuarioC();
    //Comprobar Permisos
    BreadcrumbComponent.update(BC_PAGOS);
    if(usuario.rol != 'root' && !comprobarPermisos(usuario, GESTION_PAGOS, _router)) sinAcceso(_router);
    
    BreadcrumbComponent.update(BC_VALIDAR_PAGO_ASPIRANTE);
    const navigation = this.router.getCurrentNavigation();
    if( navigation.extras.state ){
      this.usuario = JSON.parse(navigation.extras.state.usuario);
    }else{
      this.router.navigate(['/app/pagos/validar-pagos'])  
    }
  }

  ngOnInit(): void {
    this._evidenciasPagos.getEvidenciaObs(this.usuario).subscribe(value => {
      this.evidenciaPagoObject = value;
    }); //PRODUCCION
  }

  ngAfterViewInit() {
    //this.updateTablaUsuarios();
  }

  //HTTP
  onEnviarCorrecciones() {
    if(this.evidenciaPagoObject.comentarios == ""){
      this._toast.error("Agrega un comentario a la corrección.");
      return;
    }

    if (!this.evidenciaPagoObject.valido) {
      this._evidenciasPagos.save(this.evidenciaPagoObject, this.usuario.id).then(response => {
        this._personaService.updateEstadoPago(this.usuario, EstadoPago.INVALIDA);
        this._toast.success("Se envio la corrección");
        this.router.navigate([BC_VALIDAR_PAGO_ASPIRANTE.links[2].url]);
      }).catch(err => this._toast.error("Ha ocurrido un error"));
    } else {
      this._toast.warning("La evidencia de pago ha sido validada");
    }
  }

  onFinalizar() {
    if (this.evidenciaPagoObject.valido) {
      this._swal.confirmarFinalizar("¿Finalizar validación del pago?", "No podras cambiar el estado del pago despues.")
        .then(result => {
          if (result.value) {
            //let documentacionFinal = this.formatRequisitosFinal();
            this._evidenciasPagos.save(this.evidenciaPagoObject, this.usuario.id).then(response => {
              this._personaService.updateEstadoPago(this.usuario, EstadoPago.VALIDADA);
              this._toast.success("Se ha finalizado la validación de la evidencia de pago");
              this.router.navigate([BC_VALIDAR_PAGO_ASPIRANTE.links[2].url]);
            }).catch(err => this._toast.error("Ha ocurrido un error"));
          }
        }).catch(err => this._toast.error("Ha ocurrido un error" + err));
    } else {
      this._toast.error("Debe validar la evidencia de pago para finalizar.");
    }
  }

  abrirArchivo() {
    let data = {
      archivo: this.evidenciaPagoObject.archivo,
      nombre: this.evidenciaPagoObject.nombre
    }

    const dialogRef = this.dialog.open(ModalVerDocumentoRequisito, {
      width: '1000px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
}

@Component({
  selector: 'modal-editar',
  templateUrl: './modal-documento.component.html',
})
export class ModalVerDocumentoRequisito {

  constructor(
    public dialogRef: MatDialogRef<ModalVerDocumentoRequisito>,
    public sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
