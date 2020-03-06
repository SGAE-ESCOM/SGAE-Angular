import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { BreadcrumbComponent } from '@shared/breadcrumb/breadcrumb.component';
import { BC_SUBIR_DOCUMENTACION } from '@shared/routing-list/ListLinks';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { SubirDocumentacionService } from '@services/documentacion/subir-documentacion.service';
import { UsuarioInterface } from '@models/persona/usuario';
import { TipoDato } from '@models/documentacion/tipo-dato';
import { AuthService } from '@services/auth.service';
import { EstadoDocumentacion } from "@models/documentacion/enums/estado-documentacion.enum";
import { UsuarioService } from '@services/usuario/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subir-documentacion',
  templateUrl: './subir-documentacion.component.html',
  styleUrls: ['./subir-documentacion.component.scss']
})
export class SubirDocumentacionComponent implements OnInit {

  private usuario: UsuarioInterface;
  estadoDocUsuario: string;
  estadosDoc = EstadoDocumentacion;
  mostrarFormulario = false;
  formularioRequisito: FormGroup;
  requisitosValidos: any;
  tituloFormulario = 'Formulario de requisitos';
  requisitos: any[];
  requisitosGuardados: any;

  constructor(private _toast: ToastrService, private _swal: SweetalertService,
    private _subirDoc: SubirDocumentacionService, private _authService: AuthService,
    private _usuarioService: UsuarioService, private router: Router) {
    BreadcrumbComponent.update(BC_SUBIR_DOCUMENTACION);
    this.usuario = this._authService.getUsuarioC();
    this.estadoDocUsuario = this.usuario.estado.documentacion;
  }

  /**
   * Para llevar otro tipo de control, crear una funcion en cadena. 
   * 1. Se piden los requisitos
   * 2. Se piden los valores previos guardados
   * 3. Si es null termina, si existen valores hacer una funcion para anexar el valor en el valor que se le envia al componente.
   * 4. Pintar y continuar con el valor.
   */
  ngOnInit() {
    console.log(this.estadoDocUsuario);
    if (this.estadoDocUsuario === this.estadosDoc.INVALIDA || this.estadoDocUsuario === this.estadosDoc.CORRECCION) {
      this.mostrarFormulario = true;
      this._subirDoc.getRequisitos().subscribe((documentos: TipoDato[]) => {
        this.requisitos = documentos;
        this._subirDoc.getDocumentacion(this.usuario).subscribe(
          requisito => this.requisitosGuardados = requisito, err => this._toast.error("Ha ocurrido un error"));
      }); //PRODUCCION
    }
  }

  //Peticiones REST
  finalizarFormulario(formularioRecivido: FormGroup) {
    if (formularioRecivido.valid) {
      this._swal.confirmarFinalizar('¿Deseas finalizar la documentación?').then(result => {
        if (result.value) {
          if (this.estadoDocUsuario === EstadoDocumentacion.INVALIDA) {
            this.requisitosValidos = this.saveRequisitos(formularioRecivido);
          } else {
            this.requisitosValidos = this.updateRequisitos(formularioRecivido);
          }
          this._subirDoc.saveDocumentacion(this.usuario, this.requisitosValidos)
            .then(result => {
              this._toast.success("La información se envió correctamente");
              this._usuarioService.updateEstadoDocumentacion(this.usuario, EstadoDocumentacion.REVISION);
              this.router.navigate([BC_SUBIR_DOCUMENTACION.links[0].url]);
            })
            .catch(error => this._toast.error(error));
        }
      });
    } else {
      this._toast.error("El formulario no es válido", "Mensaje de prueba");
    }
  }

  guardarFormulario(formularioRecivido: FormGroup) {
    if (this.estadoDocUsuario === EstadoDocumentacion.INVALIDA) {
      this.requisitosValidos = this.saveRequisitos(formularioRecivido);
    } else {
      this.requisitosValidos = this.updateRequisitos(formularioRecivido);
    }
    if (Object.keys(this.requisitosValidos).length) {
      this._subirDoc.saveDocumentacion(this.usuario, this.requisitosValidos)
        .then(result => this._toast.info("La información se guardo correctamente"))
        .catch(error => this._toast.error(error));
    } else {
      this._toast.error("Debe existir por lo menos un valor para guardar", "Valor invalido");
    }
  }

  private saveRequisitos(formulario: FormGroup) {
    let listaRequisitosValidos = { comentarios: '', documentacion: {} };
    for (let [nombre, requisito] of Object.entries(formulario.controls)) {
      if (!requisito.invalid)
        listaRequisitosValidos.documentacion[nombre] = { valor: requisito.value, valido: false };
    }
    return listaRequisitosValidos;
  }

  private updateRequisitos(formulario: FormGroup) {
    for (let [nombre, requisito] of Object.entries(formulario.controls)) {
      if (requisito.valid)
        this.requisitosGuardados.documentacion[nombre].valor = requisito.value;
    }
    return Object.assign({}, this.requisitosGuardados);
  }
}
