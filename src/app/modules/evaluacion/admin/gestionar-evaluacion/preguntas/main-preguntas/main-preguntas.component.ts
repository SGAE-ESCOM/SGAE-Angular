import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BreadcrumbComponent } from '@components/breadcrumb/breadcrumb.component';
import { Pregunta } from '@models/evaluacion/evaluacion/pregunta';
import { Tema } from '@models/evaluacion/evaluacion/tema';
import { Tabla } from '@models/utils/Tabla';
import { TemasService } from '@services/evaluacion/temas.service';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { BC_PREGUNTAS } from '@shared/routing-list/ListLinks';
import { fadeInLeft, fadeInRight } from '@shared/utils/animations/router.animations';
import { MJS_ERROR_REQUERIDO, MJS_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION } from '@shared/utils/mensajes';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-main-preguntas',
  templateUrl: './main-preguntas.component.html',
  styleUrls: ['./main-preguntas.component.scss'],
  animations: [fadeInLeft(), fadeInRight()]
})
export class MainPreguntasComponent implements OnInit {

  //TABLA TEMAS
  tablaTemas: Tabla[] = [{ encabezado: 'Tema', json: 'tema' }, { encabezado: "Subtemas", json: 'subtemas' }, { encabezado: 'Acciones', json: 'acciones' }];
  tablaPreguntas: Tabla[] = [{ encabezado: 'Enunciado', json: 'enunciado' }, { encabezado: 'Respuestas', json: 'respuestas' }, { encabezado: 'Acciones', json: 'acciones' }];

  temas: Tema[] = [];

  prueba: string[] = ['Hola', 'Mundo', 'Amigos'];

  preguntas: Pregunta[] = [];

  titulo: string = 'Agregando';
  isMain: boolean = true;
  isAgregando: boolean = false;

  fgTema: FormGroup;
  tema: Tema;

  //MSJ
  MJS_ERROR_REQUERIDO = MJS_ERROR_REQUERIDO;
  MJS_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION = MJS_ERROR_REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION;

  constructor(public dialog: MatDialog, private fb: FormBuilder, private _swal: SweetalertService, private _toastr: ToastrService, private _temas: TemasService) {
    BreadcrumbComponent.update(BC_PREGUNTAS);
  }

  ngOnInit(): void {
    this.getTemas()
  }


  /****************************  HTTP  ***************************/
  getTemas() {
    this._temas.get().subscribe(temas => this.temas = temas);
  }

  /****************************  ACCIONES  ***************************/
  showTema(tema?: Tema) {
    this.titulo = (tema != null) ? tema.tema : 'Agregar tema';
    this.tema = (tema != null) ? tema : new Tema('');
    this.isMain = false;
  }

  cancelarPreguntas(accion:Boolean) {
      if (accion)
        this.isMain = true;
  }

  /**************************************** UTILS **************************************/


  /**************************************** MODALS *************************************/
  ///////////////////////// TEMA ///////////////////////////////
  modalAgregarTema() {
    const dialogRef = this.dialog.open(ModalTemas, {
      width: '600px',
      data: { opc: 'agregar' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) { }
    });
  }

  modalActualizarTema(tema: Tema) {
    const dialogRef = this.dialog.open(ModalTemas, {
      width: '600px',
      data: { opc: 'actualizar', tema: tema }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) { }
    });
  }

  modalEliminarTema(tema: Tema) {
    this._swal.confirmarEliminar(`¿Deseas eliminar tema '${tema.tema}'?`, 'No se podrá revertir esta acción')
      .then((result) => {
        if (result.value) {
          this._temas.delete(tema).then(() => {
            this._swal.eliminadoCorrecto('El tema se ha eliminado')
          }).catch(err => this._toastr.error(err));
        }
      });
  }

  
}

/******************************* MODALS COMPONENT ***********************************/
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
