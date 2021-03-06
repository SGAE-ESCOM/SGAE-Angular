import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { Pregunta } from '@models/evaluacion/evaluacion/pregunta';
import { Seccion } from '@models/evaluacion/evaluacion/seccion';
import { Tema } from '@models/evaluacion/evaluacion/tema';
import { Tabla } from '@models/utils/Tabla';
import { AdminEvaluacionesService } from '@services/evaluacion/admin-evaluaciones.service';
import { PreguntasService } from '@services/evaluacion/preguntas.service';
import { SeccionesService } from '@services/evaluacion/secciones.service';
import { TemasService } from '@services/evaluacion/temas.service';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { BC_PREGUNTAS } from '@shared/routing-list/ListLinks';
import { fadeInLeft, fadeInRight } from '@shared/utils/animations/router.animations';
import { MSJ_ERROR_REQUERIDO, MSJ_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION, MSJ_ERROR_CONECTAR_SERVIDOR } from '@shared/utils/mensajes';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-main-preguntas',
  templateUrl: './main-preguntas.component.html',
  styleUrls: ['./main-preguntas.component.scss'],
  animations: [fadeInLeft(), fadeInRight()]
})
export class MainPreguntasComponent implements OnInit {

  //TABLA TEMAS
  tablaSecciones: Tabla[] = [{ encabezado: 'Sección', json: 'nombre' }, { encabezado: 'Acciones', json: 'acciones' }];
  tablaTemas: Tabla[] = [{ encabezado: 'Tema', json: 'nombre' }, { encabezado: "Preguntas totales", json: 'total' }, { encabezado: 'Acciones', json: 'acciones' }];
  ordenarPorNombre = "nombre";

  temas: Tema[] = [];
  secciones: Seccion[] = [];
  preguntas: Pregunta[] = [];

  titulo: string = 'Agregando';
  seccionActivada: string = 'secciones';

  tema: Tema;
  seccion: Seccion;

  //MSJ
  MJS_ERROR_REQUERIDO = MSJ_ERROR_REQUERIDO;
  MJS_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION = MSJ_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION;

  constructor(public dialog: MatDialog, private fb: FormBuilder, private _swal: SweetalertService, private _toastr: ToastrService,
    private _evaluaciones: AdminEvaluacionesService,
    private _temas: TemasService, private _secciones: SeccionesService, private _preguntas: PreguntasService) {
    BreadcrumbComponent.update(BC_PREGUNTAS);
  }

  ngOnInit(): void {
    this.getSecciones()
  }


  /******************************************  HTTP  ********************************************/
  //GETTERS
  async getSecciones() {
    this._secciones.get().subscribe(secciones => this.secciones = secciones);
  }

  async getTemas() {
    return this._temas.get(this.seccion).then((querySnapshot) => {
      let temas = [];
      querySnapshot.forEach((doc) => {
        const pregunta = doc.data();
        pregunta.id = doc.id;
        temas.push(pregunta);
      });
      this.temas = temas;
    }).catch(err => { this._toastr.error(MSJ_ERROR_CONECTAR_SERVIDOR) });
  }

  async getPreguntas(tema: Tema) {
    await this._preguntas.getPreguntas(tema).then((querySnapshot) => {
      let preguntas = [];
      querySnapshot.forEach((doc) => {
        const pregunta = doc.data();
        pregunta.id = doc.id;
        preguntas.push(pregunta);
      });
      this.preguntas = preguntas;
    }).catch(err => { this._toastr.error(MSJ_ERROR_CONECTAR_SERVIDOR) });
  }

  //DELETE
  async eliminarTema(tema: Tema) {
    //await this.getPreguntas(tema);
    await this.eliminarPreguntas(tema);
    this._temas.delete(tema).then(() => {
      this._swal.eliminadoCorrecto('El tema se ha eliminado');
      this.getTemas();
    }).catch(err => this._toastr.error(err));
  }

  async eliminarPreguntas(tema: Tema) {
    this._preguntas.getAllPreguntas(tema).then((preguntas: Pregunta[]) => {
      this._preguntas.deleteAll(preguntas).then(() => {
      }).catch(err => this._toastr.error(MSJ_ERROR_CONECTAR_SERVIDOR));
    });
  }
  /************************************  ACCIONES  ************************************************/
  showSeccion(seccion: Seccion) {
    this.seccion = seccion;
    this.getTemas();
    this.seccionActivada = 'temas';
  }

  showTema(tema?: Tema) {
    this.titulo = (tema != null) ? tema.nombre : 'Agregar tema';
    this.tema = (tema != null) ? tema : new Tema();
    this.seccionActivada = 'pregunta';
  }

  cancelarTema() {
    this.seccionActivada = 'secciones';
  }

  cancelarPreguntas(accion: Boolean) {
    if (accion)
      this.seccionActivada = 'temas';
  }

  /**************************************** UTILS **************************************************/


  /**************************************** MODALS ************************************************/
  ///////////////////////// SECCIONES ///////////////////////////////
  modalAgregarSeccion() {
    const dialogRef = this.dialog.open(ModalSeccion, {
      width: '600px',
      data: { opc: 'agregar', seccion: new Seccion() }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { }
    });
  }

  modalActualizarSeccion(seccion: Seccion) {
    const dialogRef = this.dialog.open(ModalSeccion, {
      width: '600px',
      data: { opc: 'actualizar', seccion: seccion }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) { }
    });
  }

  modalEliminarSeccion(seccion: Seccion) {
    this._swal.confirmarEliminar(`¿Deseas eliminar la sección '${seccion.nombre}'?`, 'No se podrá revertir esta acción')
      .then((result) => {
        if (result.value) {
          this._evaluaciones.findAllInEvaluacion(seccion).then((evaluaciones: any) => {
            //Se valida que no hay evaluaciones que dependen de esta seccion
            if (evaluaciones.length) {
              this._swal.confirmarEliminar('Existen evaluaciones que dependen de esta sección','Si eliminas la seccion será borrado también de las evaluaciones en que las definiste')
            } else {
              this.seccion = seccion;
              this.getTemas().then(res => {
                this._temas.deleteAll(this.temas);
              }).then(res => {
                this._secciones.delete(seccion).then(() => {
                  this._swal.eliminadoCorrecto('La sección se ha eliminado');
                }).catch(err => this._toastr.error(err));
              });
            }
          })
        }
      });
  }

  ///////////////////////// TEMA ///////////////////////////////
  modalAgregarTema() {
    const dialogRef = this.dialog.open(ModalTemas, {
      width: '600px',
      data: { titulo: 'Agregar', opc: 'agregar', tema: new Tema(), seccion: this.seccion }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.getTemas(); }
    });
  }

  modalActualizarTema(tema: Tema) {
    const dialogRef = this.dialog.open(ModalTemas, {
      width: '600px',
      data: { titulo: 'Editar', opc: 'actualizar', tema: tema, seccion: this.seccion }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) { this.getTemas(); }
    });
  }

  modalEliminarTema(tema: Tema) {
    this._swal.confirmarEliminar(`¿Deseas eliminar el tema '${tema.nombre}'?`, 'No se podrá revertir esta acción')
      .then((result) => {
        if (result.value) {
          this.eliminarTema(tema);
        }
      });
  }


}

/************************************* MODALS COMPONENT *********************************************/
///////////////////////// SECCION ///////////////////////////////
@Component({
  selector: 'modal-seccion',
  templateUrl: './modal-seccion.component.html',
})
export class ModalSeccion {

  constructor(
    public dialogRef: MatDialogRef<ModalSeccion>,
    private _toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  cerrar(): void {
    this.dialogRef.close();
  }

  accion(realizado: boolean) {
    this.dialogRef.close(realizado);
  }

}

///////////////////////// TEMA ///////////////////////////////
@Component({
  selector: 'modal-tema',
  templateUrl: './modal-tema.component.html',
})
export class ModalTemas {

  constructor(
    public dialogRef: MatDialogRef<ModalTemas>,
    private _toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  cerrar(): void {
    this.dialogRef.close();
  }

  accion(realizado: boolean) {
    this.dialogRef.close(realizado);
  }

}