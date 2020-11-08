import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pregunta } from '@models/evaluacion/evaluacion/pregunta';
import { Tema } from '@models/evaluacion/evaluacion/tema';
import { SweetalertService } from '@services/sweetalert/sweetalert.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-simulador',
  templateUrl: './crear-simulador.component.html',
  styleUrls: ['./crear-simulador.component.scss']
})
export class CrearSimuladorComponent implements OnInit, OnChanges {

  @Input() tema: Tema;
  @Output() onCancelar: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  fgSimulador: FormGroup;
  preguntas: Pregunta[] = [
    {
      enunciado: '¿De que color es el sol?',
      opciones: [{ id: 0, enunciado: 'Azul' }, { id: 1, enunciado: 'Verde' }, { id: 2, enunciado: 'Rojo' }, { id: 3, enunciado: 'Amarillo' }], respuesta: 3
    },
    {
      enunciado: 'La factorización del bibnomio $4a^2 - 9b^2$', img: 'data:image/png;base64,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',
      opciones: [{ id: 0, enunciado: 'Lorem ipsum dolor sit amet consectetur adipisicing' }, { id: 0, enunciado: 'Lorem ipsum dolor sit amet consectetur' }, { id: 0, enunciado: 'Lorem amet consectetur adipisicing' }], respuesta: 1
    },
    {
      enunciado: 'La factorización del bibnomio $4a^2 - 9b^2$',
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

  constructor(public dialog: MatDialog, private fb: FormBuilder, private _swal: SweetalertService, private _toast:ToastrService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.tema)
      console.log("CaMBIO el tema .v")
  }

  ngOnInit(): void {
  }

  /************************** ACCIONES **************************/
  onActualizar(pregunta:Pregunta){
    console.log(pregunta);
  }

  onEliminar(pregunta:Pregunta){
    console.log(pregunta);
  }

  ///////////////////////// PREGUNTA ///////////////////////////////
  cancelarPreguntas() {
    this._swal.confirmarCancelar('¿Deseas cancelar la edición del tema "' + this.tema.tema + '"?', 'Nada será guardado').then(result => {
      if (result.value)
        this.onCancelar.emit(true);
    });
  }


  modalAgregarPregunta() {
    const dialogRef = this.dialog.open(ModalPregunta, {
      width: '1024px',
      data: { opc: 'agregar', pregunta: new Pregunta()}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) { }
    });
  }

  modalActualizarPregunta(pregunta: Pregunta) {
    console.log(pregunta)
    const dialogRef = this.dialog.open(ModalPregunta, {
      width: '1024px',
      data: { opc: 'actualizar', pregunta: pregunta }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) { }
    });
  }

  modalEliminarPregunta(tema: Tema) {
    this._swal.confirmarEliminar(`¿Deseas eliminar pregunta '${tema.tema}'?`, 'No se podrá revertir esta acción')
      .then((result) => {
        if (result.value) {
          /* this._temas.delete(tema).then(() => {
            this._swal.aspiranteEliminadoCorrectamente();
          }).catch(err => this._toastr.error(err)); */
        }
      });
  }

  /************************** UTILS **************************/
  initForm() {
    this.fgSimulador = this.fb.group({});
  }
}

/******************************* MODALS COMPONENT ***********************************/
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
    if(realizado){
      this.dialogRef.close(realizado);
      console.log('DEbes actualizar el app-form-crear')
    }
  }

}