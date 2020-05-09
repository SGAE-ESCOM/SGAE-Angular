import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { BreadcrumbComponent } from '@shared/breadcrumb/breadcrumb.component';
import { BC_VALIDAR_DOC_ASPIRANTE, BC_DOCUMENTACION } from '@shared/routing-list/ListLinks';
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { UsuarioInterface } from '@models/persona/usuario';
import { ValidarDocumentacionService } from '@services/documentacion/validar-documentacion.service';
import { UsuarioService } from '@services/usuario/usuario.service';
import { EstadoDocumentacion } from "@models/documentacion/enums/estado-documentacion.enum";
import { AccesosAdministrador } from '@shared/admin-permissions/permissions';

@Component({
  selector: 'app-validar-aspirante',
  templateUrl: './validar-aspirante.component.html',
  styleUrls: ['./validar-aspirante.component.scss']
})
export class ValidarAspiranteComponent implements OnInit, AfterViewInit {

  //Variables para las tablas
  requisitosTabla;

  //Variables de logica validacion
  documentacionObject: any = { comentarios: '', documentacion: {} };
  requisitosAspirante: any;
  comentarios = '';
  requisitosValidados: any[] = [];
  usuario: UsuarioInterface;

  constructor(public dialog: MatDialog, private _subirDocService: ValidarDocumentacionService, 
        private _personaService: UsuarioService, private route: ActivatedRoute, 
        private router: Router, private _toast: ToastrService, 
        private _swal: SweetalertService, private accesosAdministrador: AccesosAdministrador) {
    BreadcrumbComponent.update(BC_DOCUMENTACION);
    if(this.accesosAdministrador.accesoDocumentacion()){
      BreadcrumbComponent.update(BC_VALIDAR_DOC_ASPIRANTE);
      const navigation = this.router.getCurrentNavigation();
      if( navigation.extras.state ){
        this.usuario = JSON.parse(navigation.extras.state.usuario);
      }else{
        this.router.navigate(['/app/documentacion/validar/'])  
      }
    }
  }

  ngOnInit(): void {
    this._subirDocService.getDocumentacion(this.usuario).subscribe(requisitos => { this.formatearRequisitos(requisitos) }); //PRODUCCION
  }

  ngAfterViewInit() {
    //this.updateTablaUsuarios();
  }

  //HTTP
  onEnviarCorrecciones() {
    let todosValidos = this.todosValidos();
    if (!todosValidos) {
      this._subirDocService.updateDocumentacion(this.usuario, this.documentacionObject).then(response => {
        this._personaService.updateEstadoDocumentacion(this.usuario, EstadoDocumentacion.CORRECCION);
        this._toast.success("Se han enviado las correcciones");
        this.router.navigate([BC_VALIDAR_DOC_ASPIRANTE.links[2].url]);
      }).catch(err => this._toast.error("Ha ocurrido un error"));
    } else {
      this._toast.warning("Ya todos los requisitos son validos");
    }
  }

  onFinalizar() {
    let todosValidos = this.todosValidos();
    if (todosValidos) {
      this._swal.confirmarFinalizar("¿Finalizar validación de aspirante?", "No podras cambiar el estado del aspirante después.")
        .then(result => {
          if (result.value) {
            //let documentacionFinal = this.formatRequisitosFinal();
            this._subirDocService.updateDocumentacion(this.usuario, this.documentacionObject).then(response => {
              this._personaService.updateEstadoDocumentacion(this.usuario, EstadoDocumentacion.VALIDADA);
              this._toast.success("Se ha finalizado la validación del aspirante");
              this.router.navigate([BC_VALIDAR_DOC_ASPIRANTE.links[2].url]);
            }).catch(err => this._toast.error("Ha ocurrido un error"));
          }
        }).catch(err => this._toast.error("Ha ocurrido un error" + err));
    } else {
      this._toast.error("Todos los requisitos deben ser válidos para poder finalizar");
    }
  }

  private todosValidos(): boolean {
    let todosValidos = true;
    for (let i = 0; i < this.requisitosValidados.length; i++) {
      if (todosValidos && this.requisitosValidados[i][1].valido)
        continue;
      return false;
    }
    return true;
  }

  //Logica del frontend
  private formatearRequisitos(requisitosSinFormato) {
    this.documentacionObject = requisitosSinFormato;
    this.comentarios = this.documentacionObject.comentarios;
    this.requisitosAspirante = this.documentacionObject.documentacion;
    this.requisitosValidados = Object.entries(this.requisitosAspirante);
    this.requisitosTabla = this.requisitosValidados.map(([requisito, json]: any) => {
      let requistoAux = { nombre: requisito, valor: json.valor, tipo: 'texto' };
      if (typeof requistoAux.valor == 'object') {
        requistoAux.tipo = 'archivo';
      }
      return requistoAux;
    });
  }

  private formatRequisitosFinal() {
    let documnetacionFinal = Object.assign({}, this.requisitosAspirante);
    Object.entries(documnetacionFinal).forEach(([requisito, valor]:any) => {
      documnetacionFinal[requisito] = valor.valor;
    });
    return documnetacionFinal;
  }

  abrirArchivo(archivo) {
    const dialogRef = this.dialog.open(ModalVerDocumentoRequisito, {
      width: '1000px',
      data: archivo
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