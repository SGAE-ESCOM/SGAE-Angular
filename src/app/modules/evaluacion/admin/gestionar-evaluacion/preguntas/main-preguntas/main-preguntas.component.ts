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
import { REGEX_ALPHANUMERICO_CON_ESPACIOS_Y_PUNTUACION } from '@shared/utils/validators/regex';
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

  temas: Tema[] = [
    /* { id: '111', tema: 'Matemáticas', subtema: ['Algebra', 'Trigonometria'] },
    { id: '222', tema: 'Español', subtema: ['Compresión Lectora', 'Reminder'] } */
  ];

  prueba: string[] = ['Hola', 'Mundo', 'Amigos'];

  preguntas: Pregunta[] = [
    {
      enunciado: '¿De que color es el sol?',
      opciones: [{ id: 0, enunciado: 'Azul' }, { id: 1, enunciado: 'Verde' }, { id: 2, enunciado: 'Rojo' }, { id: 3, enunciado: 'Amarillo' }], respuesta: 3
    },
    {
      enunciado: '¿Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptatibus labore modi, rem deserunt voluptas possimus nulla ipsa autem fuga quis esse, obcaecati quas tempore. Doloribus nobis corporis cum fugiat?',
      opciones: [{ id: 0, enunciado: 'Lorem ipsum dolor sit amet consectetur adipisicing' }, { id: 0, enunciado: 'Lorem ipsum dolor sit amet consectetur' }, { id: 0, enunciado: 'Lorem amet consectetur adipisicing' }], respuesta: 1
    },
    {
      enunciado: '¿Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptatibus labore modi, rem deserunt voluptas possimus nulla ipsa autem fuga quis esse, obcaecati quas tempore. Doloribus nobis corporis cum fugiat?',
      opciones: [{ id: 0, enunciado: 'Lorem ipsum dolor sit amet consectetur adipisicing' }, { id: 0, enunciado: 'Lorem ipsum dolor sit amet consectetur' }, { id: 0, enunciado: 'Lorem amet consectetur adipisicing' }], respuesta: 1
    },
    {
      enunciado: '¿Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptatibus labore modi, rem deserunt voluptas possimus nulla ipsa autem fuga quis esse, obcaecati quas tempore. Doloribus nobis corporis cum fugiat?',
      opciones: [{ id: 0, enunciado: 'Lorem ipsum dolor sit amet consectetur adipisicing' }, { id: 0, enunciado: 'Lorem ipsum dolor sit amet consectetur' }, { id: 0, enunciado: 'Lorem amet consectetur adipisicing' }], respuesta: 1
    },
    {
      enunciado: '¿Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptatibus labore modi, rem deserunt voluptas possimus nulla ipsa autem fuga quis esse, obcaecati quas tempore. Doloribus nobis corporis cum fugiat?',
      opciones: [{ id: 0, enunciado: 'Lorem ipsum dolor sit amet consectetur adipisicing' }, { id: 0, enunciado: 'Lorem ipsum dolor sit amet consectetur' }, { id: 0, enunciado: 'Lorem amet consectetur adipisicing' }], respuesta: 1
    },
    {
      enunciado: '¿Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptatibus labore modi, rem deserunt voluptas possimus nulla ipsa autem fuga quis esse, obcaecati quas tempore. Doloribus nobis corporis cum fugiat?',
      opciones: [{ id: 0, enunciado: 'Lorem ipsum dolor sit amet consectetur adipisicing' }, { id: 0, enunciado: 'Lorem ipsum dolor sit amet consectetur' }, { id: 0, enunciado: 'Lorem amet consectetur adipisicing' }], respuesta: 1
    },
    {
      enunciado: '¿Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptatibus labore modi, rem deserunt voluptas possimus nulla ipsa autem fuga quis esse, obcaecati quas tempore. Doloribus nobis corporis cum fugiat?',
      opciones: [{ id: 0, enunciado: 'Lorem ipsum dolor sit amet consectetur adipisicing' }, { id: 0, enunciado: 'Lorem ipsum dolor sit amet consectetur' }, { id: 0, enunciado: 'Lorem amet consectetur adipisicing' }], respuesta: 1
    },
    {
      enunciado: '¿Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptatibus labore modi, rem deserunt voluptas possimus nulla ipsa autem fuga quis esse, obcaecati quas tempore. Doloribus nobis corporis cum fugiat?',
      opciones: [{ id: 0, enunciado: 'Lorem ipsum dolor sit amet consectetur adipisicing' }, { id: 0, enunciado: 'Lorem ipsum dolor sit amet consectetur' }, { id: 0, enunciado: 'Lorem amet consectetur adipisicing' }], respuesta: 1
    },
    {
      enunciado: '¿Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptatibus labore modi, rem deserunt voluptas possimus nulla ipsa autem fuga quis esse, obcaecati quas tempore. Doloribus nobis corporis cum fugiat?',
      opciones: [{ id: 0, enunciado: 'Lorem ipsum dolor sit amet consectetur adipisicing' }, { id: 0, enunciado: 'Lorem ipsum dolor sit amet consectetur' }, { id: 0, enunciado: 'Lorem amet consectetur adipisicing' }], respuesta: 1
    },
    {
      enunciado: '¿Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptatibus labore modi, rem deserunt voluptas possimus nulla ipsa autem fuga quis esse, obcaecati quas tempore. Doloribus nobis corporis cum fugiat?',
      opciones: [{ id: 0, enunciado: 'Lorem ipsum dolor sit amet consectetur adipisicing' }, { id: 0, enunciado: 'Lorem ipsum dolor sit amet consectetur' }, { id: 0, enunciado: 'Lorem amet consectetur adipisicing' }], respuesta: 1
    },
    {
      enunciado: '¿Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt voluptatibus labore modi, rem deserunt voluptas possimus nulla ipsa autem fuga quis esse, obcaecati quas tempore. Doloribus nobis corporis cum fugiat?',
      opciones: [{ id: 0, enunciado: 'Lorem ipsum dolor sit amet consectetur adipisicing' }, { id: 0, enunciado: 'Lorem ipsum dolor sit amet consectetur' }, { id: 0, enunciado: 'Lorem amet consectetur adipisicing' }], respuesta: 1
    },
  ];

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

  cancelarPreguntas() {
    this._swal.confirmarCancelar('¿Deseas cancelar la edición del tema?', 'Nada será guardado').then(result => {
      console.log(result)
      if (result.value)
        this.isMain = true;
    });
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
    console.log(tema)
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
            this._swal.aspiranteEliminadoCorrectamente();
          }).catch(err => this._toastr.error(err));
        }
      });
  }

  ///////////////////////// PREGUNTA ///////////////////////////////
  modalAgregarPregunta() {
    const dialogRef = this.dialog.open(ModalPregunta, {
      width: '600px',
      data: { opc: 'agregar' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) { }
    });
  }

  modalActualizarPregunta(tema: Tema) {
    console.log(tema)
    const dialogRef = this.dialog.open(ModalPregunta, {
      width: '600px',
      data: { opc: 'actualizar', tema: tema }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) { }
    });
  }

  modalEliminarPregunta(tema: Tema) {
    this._swal.confirmarEliminar(`¿Deseas eliminar tema '${tema.tema}'?`, 'No se podrá revertir esta acción')
      .then((result) => {
        if (result.value) {
          this._temas.delete(tema).then(() => {
            this._swal.aspiranteEliminadoCorrectamente();
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

///////////////////////// PREGUNTA ///////////////////////////////
@Component({
  selector: 'modal-pregunta',
  templateUrl: './modal-pregunta.component.html',
})
export class ModalPregunta {

  constructor(
    public dialogRef: MatDialogRef<ModalPregunta>,
    private _toast: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  cerrar(): void {
    this.dialogRef.close();
  }

  accion(realizado: boolean) {
    this.dialogRef.close(realizado);
  }

}